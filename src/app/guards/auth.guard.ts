import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  redirectUrl;

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

 
 

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (localStorage.getItem('user')) {
      return true;
  }
  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  return false;
}


}