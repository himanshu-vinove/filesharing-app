import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  users = [];
  activeUsers = [];
  searchText;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getActiveUsers();
  }

  getAllUsers(): any {
    this.userService.getAllUsers().subscribe((users) => {
      console.log(users);
      this.users = users;
    });
  }

  toggleBlockedState(blockState, id): any {
    blockState = !blockState;
    this.userService.updateBlockState(blockState, id).subscribe(() =>{
      this.getAllUsers();
    });
  }

  getActiveUsers(): any {
    this.userService.getActiveUsers().subscribe((active) => {
      // console.log(active);
      this.activeUsers = active;
      // this.getActiveUsers();
    });
  }

  onScroll() {
    console.log('scrolled!!');
  }
 

}
