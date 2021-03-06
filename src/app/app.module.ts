import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import {RegistrationComponent} from './registration/registration.component';
import {CreatePostComponent} from './create-post/create-post.component';
import {UserComponent} from './user/user.component';
import { ReportingComponent } from './reporting/reporting.component';
import { UsersComponent } from './reporting/users/users.component';
import { PostsComponent } from './reporting/posts/posts.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';

@NgModule({
  declarations: [
    TimeAgoPipe,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    RegistrationComponent,
    CreatePostComponent,
    UserComponent,
    ReportingComponent,
    CommentBoxComponent,
    UsersComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
