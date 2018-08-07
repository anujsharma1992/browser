
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm(); 
   }

   createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      
    });
  }

  disableForm() {
    this.form.controls['email'].disable(); 
  }

  enableForm() {
    this.form.controls['email'].enable(); 
  }

  onforgotSubmit() {
    this.processing = true; 
    this.disableForm(); 
    
    const user = {
      email: this.form.get('email').value, 
    }

    this.authService.forgotpassword(user).subscribe(data => {
      if (data.code==200) {
          this.messageClass = 'alert alert-success'; 
          this.message = data.message; 
          this.authService.storeUserData(data.authToken, data.data);
          setTimeout(() => {
            this.router.navigate(['/login']); 
          }, 2000);
     
      } else {
          this.messageClass = 'alert alert-danger'; 
          this.message = data.message; 
          this.processing = false; 
          this.enableForm();
      }
    });
  }

  ngOnInit() {
  }

}
