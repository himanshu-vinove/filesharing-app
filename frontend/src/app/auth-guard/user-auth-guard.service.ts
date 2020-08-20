import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let flag = false;
    //  console.log('user Auth guard Check');
    if (this.userService.isLoggedIn()) {
      console.log('User authenticated');
      flag = true;
    } else {
      console.log('User not authenticated');
      this.router.navigate(['login']);
    }
    return flag;
  }
}
