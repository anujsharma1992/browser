import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageClass;
  public loader: boolean;
  message;
  processing = false;
  form: FormGroup;
  previousUrl;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) { 
    this.createForm(); // Create Login Form when component is constructed
  }


  // Function to create registration form
  createForm() {
    this.form = this.formBuilder.group({
      // Email Input
      email: ['', Validators.compose([
        Validators.required, // Field is required
        this.validateEmail // Custom validation
      ])],
     
      // Password Input
      password: ['', Validators.compose([
        Validators.required, // Field is required
        
      
      ])],
     
    }); // Add custom validator to form for matching passwords
  }

  
  // Function to validate e-mail is proper format
  validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }

 

 
    // Function to create login form
    // createForm() {
    //   this.form = this.formBuilder.group({
    //     email: ['', Validators.required], // Username field
    //     password: ['', Validators.required] // Password field
    //   });
    // }
  
    // Function to disable form
    disableForm() {
      this.form.controls['email'].disable(); // Disable username field
      this.form.controls['password'].disable(); // Disable password field
    }
  
    // Function to enable form
    enableForm() {
      this.form.controls['email'].enable(); // Enable username field
      this.form.controls['password'].enable(); // Enable password field
    }
  
    onLoginSubmit() {
      this.processing = true; 
      this.disableForm(); 
    
      const user = {
        email: this.form.get('email').value, 
        password: this.form.get('password').value ,
      }
      
      
      this.authService.login(user).subscribe(data => {
      console.log(data)
        this.loader = true;
        // this.loading = true;
        if (data.code==200) {
          this.loader = false;
            this.messageClass = 'alert alert-success'; 
            this.message = data.message; 
            this.authService.storeUserData(data.authToken, data.data);
            setTimeout(() => {
              if (this.previousUrl) {
                this.router.navigate([this.previousUrl]); 
              } else {
                this.router.navigate(['/dashboard']);
              }
            }, 1000);
       
        } else {
            this.messageClass = 'alert alert-danger'; 
            this.message = data.message; 
            this.processing = false; 
            this.enableForm();
            this.loader = false;
        }
      });
    }

  ngOnInit() {

  
 
 
}

}
