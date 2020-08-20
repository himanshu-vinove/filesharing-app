import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.css']
})
export class AdminsidebarComponent implements OnInit {

 
  current_url: string
  constructor(private router: Router) { 
    this.current_url= ''
   }

  ngOnInit(): void {
    this.current_url = this.router.url 
  }


}
