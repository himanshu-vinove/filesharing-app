import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: any): any {
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const profile = ((form.elements.namedItem('profile')) as HTMLInputElement).files[0];
    // console.log(profile);
    const values = {
      username,
      email,
      password,
      profile
    };

    console.log(values);

    const data = new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('password', password);
    data.append('profile', profile);
    console.log(data);

    this.userService.createUser(data).subscribe(() => {
      alert('User created successfully!!');
      form.reset();
    });
  }

}

