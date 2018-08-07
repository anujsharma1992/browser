import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
// import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  options;
  domain = this.authService.domain;
  
  constructor(
    private authService: AuthService,

    private http: Http
  ) { }


  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authtoken': this.authService.authToken, // Attach token,
        'Authorization': "Basic YWRtaW5AYnJvd3NlcmFwcC5jb206UGFzc0B3b3JkMQ=="
      })
    });
  }


  getAllTickets($event) {
    console.log($event)
    this.createAuthenticationHeaders(); // Create headers
   
    return this.http.get(this.domain+'/api/admins/all', this.options).pipe(map(res => res.json()));
  }
  // http://localhost:3010/api/admins/all

  searchTicket(term) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain+'/api/admins/search?search=' + term, this.options).pipe(map(res => res.json()));
  }


  
}
