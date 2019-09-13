import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {Post} from '../models/post-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserResponse} from '../models/user-response';
import {PostResponse} from '../models/post-response.model';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  username: string;
  user: User;
  posts: Post[];
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (Object.keys(params).length > 0 && params.username !== null) {
        this.username = params.username;
      } else {
        this.username = localStorage.getItem('username');
      }
    });
    this.getUserDetails(this.username);
    this.getUserPosts(this.username);
  }

  getUserDetails(username: string): void {
    const url = environment.url + '/users/' + username;
    this.httpClient.get<UserResponse>(url, {headers: this.headers}).subscribe(
      response => {
        if (response.code === 200) {
          this.user = response.data as User;
          console.log(this.user);
        }
      }, error => {
        this.handleError(error);
      });
  }

  getUserPosts(username: string): void {
    const url = environment.url + '/users/' + username + '/posts';
    this.httpClient.get<PostResponse>(url, {headers: this.headers}).subscribe(
      response => {
        if (response.code === 200) {
          this.posts = response.data.content as Post[];
          console.log(this.posts);
        }
      }, error => {
        this.handleError(error);
      });
  }

  handleError(error: string): void {
    console.log('Could not fetch content from server: ' + JSON.stringify(error));
  }
}
