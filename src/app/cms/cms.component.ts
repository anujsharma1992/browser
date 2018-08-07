import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CmsService } from '../services/cms.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {
  messageClass;
  message;
  queryField: FormControl = new FormControl();
  public loaderCheck = false;
  public loader: boolean;
  ticketsAll;
  processing = false;
  tickets;
  blogPost;
  a='vendor';
  b='user';
  c='advertise'
  time;
  public count;
  form;
  initiallimit=0;
  currentUrl;
  username;
  p: number = 1;
  size=10;

  constructor(
    private cmsservice:CmsService,
    private authservice:AuthService,
    private router: Router,
  ) { }

  // =====================================get all users===================================================

  async getAllTickets($event) {
    let page=$event
    this.loader = true;
    this.cmsservice.getAllTickets($event).subscribe(data => {
      console.log(data.data)
      this.loader = false;
      if (data.code == 200) {
        this.loader = false;
        this.ticketsAll = data.data; // Assign array to use in HTML
        this.p=page;
        this.tickets=this.ticketsAll
        this.count = data.totalCount;
        // this.nextpage = data; // Assign array to use in HTML

      } else {
        alert(data.message);
      }
      this.loader = false;
    });
  }

// =======================================status(high)================================================


highSetRadio(status) {
  if (status == "high") {
    this.tickets = this.ticketsAll.filter(function (ticket) {
      if (ticket.priority == "High") {
        return true;
      }
    })
  }else{
    this.tickets = this.ticketsAll;
  }
}

// ======================================status(low)==============================================


lowSetRadio(status) {
  if (status == "low") {
    this.tickets = this.ticketsAll.filter(function (ticket) {
      if (ticket.priority == "Low") {
        return true;
      }
    })
  }else{
    this.tickets = this.ticketsAll;
  }
}


// ==========================all tickets=========================================================
allTicket(status) {
  if (status == "all") {
    this.tickets = this.ticketsAll;
  
  }
}


  ngOnInit() {

    this.getAllTickets(1)

    this.queryField.valueChanges
    .pipe(debounceTime(400))
    .subscribe(queryField =>this.cmsservice.searchTicket(queryField).subscribe(data => {
    if (data.code==200) {

      this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.tickets=data.data[1];
   
    } else {
        this.messageClass = 'alert alert-danger';
        this.message = data.message; 
        this.processing = false; 

    }
  }))

  }

}
