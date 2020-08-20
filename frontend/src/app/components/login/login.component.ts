import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  role;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService._loginObservable.subscribe(() => {
      this.isLoggedIn = this.userService.isLoggedIn();
      this.role = localStorage.getItem('role');
      if (this.role === 'admin') {
        this.router.navigate(['adminDashboard']);
      }
      if (this.role === 'user') {
        this.router.navigate(['userDashboard']);
      }
    });

  }

  onSubmit(form: NgForm): any {
    // console.log(form.value);

    this.userService.login(form.value).subscribe((result: any) => {
      // this.navigateToDashboard()
      // console.log(result.role);
      this.isLoggedIn = this.userService.isLoggedIn();
      const userId = localStorage.getItem('id');
      this.userService.updateOnlineStatus(true, userId).subscribe();

      if (result.role === 'admin' && result.blockedStatus === false){
        this.router.navigate(['adminDashboard']);
      }
      else if (result.role === 'user' && result.blockedStatus === false){
        this.router.navigate(['userDashboard']);
      }else {
        alert('User is blocked');
      }
    });
    form.reset();
  }
}
