import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptorService } from './interceptor/header-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminsidebarComponent } from './components/admin-sidebar/adminsidebar.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    AdminsidebarComponent,
    AboutUsComponent,
    TermsConditionsComponent,
    FileUploadComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    InfiniteScrollModule,
    FileUploadModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),

  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);