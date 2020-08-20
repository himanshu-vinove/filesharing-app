import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor{
  constructor(private userService: UserService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const header = req.headers.set('authorization', this.userService.getToken());
    const request = req.clone({
      headers: header,
    });
    // console.log(request);
    return next.handle(request);
  }
}
