import { Component, OnInit } from '@angular/core';
import { AdsService } from '../services/ads.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  messageClass;
  message;
  public loaderCheck = false;
  public loader: boolean;
  ads;
  id='5b43090aa193b279aa98f8c6'
  processing = false;
  tickets;
  blogPost;
  vendors;
  time;
  // modalRef: BsModalRef;
  views;
  public count;
  form;
  initiallimit=0;
  // queryField: FormControl = new FormControl();
  nextpage;
  buttonDisabled: boolean = true;
  
  currentUrl;
  username;
  p: number = 1;
  size=10;
  constructor(
    private adsservice:AdsService
  ) { }


// ===========================================ads listt====================================================


async getAllAds($event) {
  let page=$event
this.loader=true;
  this.adsservice.getAllAds($event).subscribe(data => {
    this.loader = false;
    if (data.code == 200) {
      this.loader = false;
      this.ads = data.data; // Assign array to use in HTML
      this.p=page;
      this.count = data.totalCount;
      this.nextpage = data; // Assign array to use in HTML

    } else {
      alert(data.message);
    }
    this.loader = false;
  });
}

// http://localhost:3010/api/admins/ad-analytic?adId=5b43090aa193b279aa98f8c6

async getAdViews(id) {
  
  this.loader=true;
    this.adsservice.getAdViews(id).subscribe(data => {
      this.loader = false;
      if (data.code == 200) {
        this.loader = false;
        this.views = data.data.totalViews; // Assign array to use in HTML
        // this.count = data.totalCount;
        // this.nextpage = data; // Assign array to use in HTML
  
      } else {
        alert(data.message);
      }
      this.loader = false;
    });
  }


// ==========================================open toogle=-===========================================
  Clickme(i) {
    // i.toggle = !i.toggle;
    $(".dd-detailsbox"+i).toggle( 1000);
    // $("#detailsbox"+i).toggle(1000);
  }
//  ===============================close toogle===============================================]
  closeme(i) {
    // i.toggle = !i.toggle;
    $(".dd-detailsbox"+i).hide(1000);
  }
 
// ===============================================================================================

buttonDisableClick(i) {
  var ad =  this.ads[i];
  var id = ad._id;
  if (ad.isActive) {
    ad.isActive=false;
  }else{
    ad.isActive=true;
  }
  this.ads[i]=ad;
  var val = {
    adsId: id,
    active:ad.isActive
  }

  this.processing = true; // Disable buttons
  this.adsservice.activedeactive(val).subscribe(data => {
    // console.log(data)
    if (!data.success) {
      this.message = data.message; // Return error message
    } else {
      // this.messageClass = 'alert alert-success'; // Return bootstrap success class
      this.message = data.message; // Return success message
    }
  });
}







     
   
  
  // $(document).ready(function(){
  //   $(".cross-closed").click(function(){
  //     $(this).parent(".dd-detailsbox").hide( 1000);
  //   });
  // });



  ngOnInit() {
    this.getAllAds(1)


    this.getAdViews(this.id)
    // 5b43090aa193b279aa98f8c6
    
  }
 
}
