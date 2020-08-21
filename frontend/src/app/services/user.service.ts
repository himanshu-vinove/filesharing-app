import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'http://127.0.0.1:3000/api/users';
  friendUrl = 'http://127.0.0.1:3000/api/friends';
  loginObservable: BehaviorSubject<{}>;
  constructor(private http: HttpClient) {
    this.loginObservable = new BehaviorSubject({});
  }

  // Getter method used to subscribe data during login and logout
  public get _loginObservable(): any {
    return this.loginObservable;
  }

  // Getting token from localsorage
  getToken(): any {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  createUser(data: any): any {
    return this.http.post(`${this.userUrl}/create`, data);
  }

  login(creds: any): any {
    return this.http.post(`${this.userUrl}/login`, creds).pipe(
      map((result: LoginResponse) => {
        localStorage.setItem('token', 'Bearer ' + result.token);
        localStorage.setItem('id', result.id);
        localStorage.setItem('role', result.role);
        this.loginObservable.next({});
        return result;
      })
    );
  }

  // Checking user session
  isLoggedIn(): boolean {
    if (this.getToken() !== '') {
      return true;
    }
    return false;
  }

  logout(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    this.loginObservable.next({});
  }

  getAllUsers(): any {
    return this.http.get(`${this.userUrl}/allusers`);
  }

  updateBlockState(blockState, id): any {
    return this.http.put(`${this.userUrl}/updateblock/${id}`, blockState);
  }

  updateOnlineStatus(onlineState, id): any {
    return this.http.put(`${this.userUrl}/updateonlinestatus/${id}`, onlineState);
  }

  getActiveUsers(): any {
    return this.http.get(`${this.userUrl}/activeusers`);
  }

  addToFriendList(id): any {
    return this.http.put(`${this.friendUrl}/addtofriendlist/${id}`, id);
  }

  getFriendList(): any {
    return this.http.get(`${this.friendUrl}/getfriendlist`);
  }

removeFromFriendList(id): any{
    return this.http.delete(`${this.friendUrl}/removefriend/${id}`, id);
  
  
}

}

interface LoginResponse {
  message: string;
  token: string;
  role: string;
  id: string;
}
