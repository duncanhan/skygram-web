import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RegistrationComponent} from './registration/registration.component';
import {UserComponent} from './user/user.component';
import { ReportingComponent } from './reporting/reporting.component';
import { UsersComponent } from './reporting/users/users.component';
import { PostsComponent } from './reporting/posts/posts.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserComponent},
  { path: 'user/:username', component: UserComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'registration', component: RegistrationComponent},
  {path: 'reporting' , component: ReportingComponent,
    children: [
      {path:  '',component:  UsersComponent},
      {path:  'posts',component:  PostsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
