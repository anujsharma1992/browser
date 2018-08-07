import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
// import { tokenNotExpired } from 'angular2-jwt';
// import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain = "http://localhost:3010"; // Development Domain
  authToken;
  user;
  options;
  Authorization;
  constructor(
    private http: Http,
    // private jwtHelper: JwtHelperService
  ) { }

  
// Function to create headers, add token, to be used in HTTP requests
 createAuthenticationHeaders() {
  this.loadToken(); // Get token so it can be attached to headers
  this.options = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json', // Format set to JSON
      'Authorization': "Basic YWRtaW5AYnJvd3NlcmFwcC5jb206UGFzc0B3b3JkMQ==" ,// Attach token
      'authtoken': this.authToken
    })
  });
 }


 loadToken() {
  this.authToken = localStorage.getItem('token');; // Get token and asssign to variable to be used elsewhere
 }

 
 login(user) {
  console.log(user)
  let headers = new Headers();
  this.createAuthenticationHeaders();
  return this.http.post(this.domain+'/api/admins/Login',user,this.options).pipe(map(res => res.json()));
}


 forgotpassword(user) {
    console.log(user)

    this.createAuthenticationHeaders();
    return this.http.post(this.domain+'/api/admins/forgot-password',user, this.options).pipe(map(res => res.json()));
  }
  
 //  // Function to logout
 logout() {
  this.authToken = null; // Set token to null
  this.user = null; // Set user to null
  localStorage.clear(); // Clear local storage
}


  // Function to store user's data in client local storage
 storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }



  // Function to check if user is logged in
  // isLoggednIn() {
  //   return this.loadToken() !== null;
  // }

   loggedIn() {
return this.loadToken()!=null
  }
 
// public isAuthenticated(): boolean {
//   const token = localStorage.getItem('token');
//   // Check whether the token is expired and return
//   // true or false
//   return !this.jwtHelper.isTokenExpired(token);
// }


}