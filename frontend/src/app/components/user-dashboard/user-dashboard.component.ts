import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  users: [];
  friendList = [];
  searchText;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getFriendList();
  }

  getAllUsers(): any {
    this.userService.getAllUsers().subscribe((users) => {
      // console.log(users);
      this.users = users;
    });
  }

  addFriend(id): any {
    this.userService.addToFriendList(id).subscribe(() => {
      
      alert('Added ');
    });
  }

  getFriendList(): any {
    this.userService.getFriendList().subscribe((list) => {
      //this.getFriendList();
      this.friendList = list;
    });
  }


  sendFile(): any{

  }
}
