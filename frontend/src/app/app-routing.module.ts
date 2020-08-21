import { UserAuthGuardService } from 'src/app/auth-guard/user-auth-guard.service';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'adminDashboard', canActivate : [ UserAuthGuardService ], component: AdminDashboardComponent },
  { path: 'userDashboard', canActivate : [ UserAuthGuardService ], component: UserDashboardComponent },
  { path: 'fileupload', canActivate : [ UserAuthGuardService ], component: FileUploadComponent  },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'terms', component: TermsConditionsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
