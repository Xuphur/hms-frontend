import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(public route: Router,
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isLoggedIn();
  }

  isLoggedIn() {
    if (localStorage.getItem('loginvalue') !== null) {
      this.route.navigate(['/dashboard']);
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
