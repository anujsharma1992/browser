import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SupportService } from '../services/support.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { SupportReplyComponent } from './support-reply/support-reply.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';



@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})

export class SupportComponent implements OnInit {
  messageClass;
  message;
  public loaderCheck = false;
  public loader: boolean;
  ticketsAll;
  processing = false;
  tickets;
  blogPost;
  time;
  modalRef: BsModalRef;
  public count;
  form;
  initiallimit=0;
  queryField: FormControl = new FormControl();
  nextpage;
  buttonDisabled: boolean = true;
  
  currentUrl;
  username;
  p: number = 1;
  size=10;

  constructor(
    private supportservice:SupportService,
    private authservice:AuthService,
    private router: Router,
     private modalService: BsModalService,
   
  
  ) { }



  openModal() {
    this.modalRef = this.modalService.show(SupportReplyComponent,  {
      initialState: {
        title: 'Modal title',
        data: {}
      }
    });
  }
// =====================================get all users===================================================

  async getAllTickets($event) {
    let page=$event
this.loader=true;
    this.supportservice.getAllTickets($event).subscribe(data => {
      console.log(data.data)
      this.loader = false;
      if (data.code == 200) {
        this.loader = false;
        this.ticketsAll = data.data; // Assign array to use in HTML
        this.p=page;
        this.tickets=this.ticketsAll
        this.count = data.totalCount;
        this.nextpage = data; // Assign array to use in HTML

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


// =================================close ticket======================================

buttonDisableClick(i) {
  var ticket =  this.tickets[i];
  var id = ticket._id;
  if (ticket.active) {
    ticket.active=false;
  }else{
    ticket.active=true;
  }
  this.tickets[i]=ticket;
  var val = {
    ticketId: id,
    active:ticket.active
  }

  this.processing = true; // Disable buttons
  this.supportservice.CloseupTicket(val).subscribe(data => {
    console.log(data)
    if (!data.success) {
      this.message = data.message; // Return error message
    } else {
      // this.messageClass = 'alert alert-success'; // Return bootstrap success class
      this.message = data.message; // Return success message
    }
  });
}









  ngOnInit() {
    this.getAllTickets(1)

    this.queryField.valueChanges
    .pipe(debounceTime(400))
    .subscribe(queryField =>this.supportservice.searchTicket(queryField).subscribe(data => {
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
