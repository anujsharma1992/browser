import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SupportService } from '../../services/support.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-support-reply',
  templateUrl: './support-reply.component.html',
  styleUrls: ['./support-reply.component.css']
})
export class SupportReplyComponent implements OnInit {
  messageClass;
  public loader: boolean;
  message;
  processing = false;
  form: FormGroup;
  previousUrl;
  ticketsAll;

  constructor(
    public modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private supportservice: SupportService,
    private router: Router,
  ) { }


    
   
    onReplySubmit(title:string) {
      // this.processing = true; 
      const user = {
        ticketId:"5b4308d7a193b279aa98f8c5",
        sender:'1',
        message: title, 
      }    
      this.supportservice.reply(user).subscribe(data => {
        console.log(data)
          this.loader = true;
          if (data.code==200) {
            this.loader = false;
              this.messageClass = 'alert alert-success'; 
              this.message = data.message; 
         
          } else {
              this.messageClass = 'alert alert-danger'; 
              this.message = data.message; 
              this.processing = false; 
         
              this.loader = false;
          }
        });
    }

  
  ngOnInit() {
  }

}
