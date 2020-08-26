import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  users: [];
  friendList = [];
  sharedWithMe: any = [];
  searchText;
  username;
  fileId = '';
  isLoggedIn = true;
  role;
  modalRef: BsModalRef;
  friendCheck;
  constructor(private userService: UserService, private toast: ToastrService, private router: Router,  private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getFriendList();
    this.role = localStorage.getItem('role');
  }

  getAllUsers(): any {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  addFriend(id): any {
    this.userService.addToFriendList(id).subscribe(() => {
      this.getFriendList();
      this.toast.success('Added to friendlist', 'Success', {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      });
      this.getFriendList();
    });

  }

  getFriendList(): any {
    this.userService.getFriendList().subscribe((list) => {
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


  shareFile(event: Event, form: HTMLFormElement): any {
    event.preventDefault();
    let email = (<HTMLInputElement>form.elements.namedItem('email')).value;
    if (!email) {
      return this.toast.error('Email can\'t be empty', 'Error');
    }
    this.userService.shareFile(this.fileId, { email }).subscribe((data) => {
      this.sharedWithMe = data;
    });
    this.modalRef.hide();
    return false;
  }
  
}
