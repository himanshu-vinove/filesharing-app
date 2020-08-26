import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = true;
  role;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.userService._loginObservable.subscribe(() => {
      const token = this.userService.getToken();
      if (token !== '') {
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

  logout(): any {
    const userId = localStorage.getItem('id');
    this.userService.updateOnlineStatus(true, userId).subscribe();
    this.userService.logout();
    this.router.navigate(['']);
    this.isLoggedIn = this.userService.isLoggedIn();
  }
}
