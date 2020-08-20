import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  users = [];
  searchText;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
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
}
