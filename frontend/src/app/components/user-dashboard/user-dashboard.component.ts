import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  users: [];
  friendList = [];
  searchText;
  isLoggedIn = true;
  role;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getFriendList();
    this.role = localStorage.getItem('role');
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
console.log("file sent");

  }

  removeFriend(id): any{
    this.userService.removeFromFriendList(id).subscribe();
    console.log("friend removed");
    
  }


  uploadFile(): any{
    this.router.navigate(['fileupload']);
  }
  
}
