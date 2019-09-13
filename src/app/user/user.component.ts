import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {Post} from '../models/post-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserResponse} from '../models/user-response';
import {PostResponse} from '../models/post-response.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: User;
  posts: Post[];
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const username = localStorage.getItem('username');
    this.getUserDetails(username);
    this.getUserPosts(username);
  }

  onSelect(user: User): void {
    console.log(user.username);
  }

  getUserDetails(username: string): void {
    const url = environment.url + '/users/' + username;
    this.httpClient.get<UserResponse>(url, {headers: this.headers}).subscribe(
      response => {
        if (response.code === 200) {
          console.log(response); // debug
          this.user = response.data as User;
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
          console.log(response); // debug
          this.posts = response.data.content as Post[];
        }
      }, error => {
        this.handleError(error);
      });
  }

  handleError(error: string): void {
    console.log('Could not fetch content from server: ' + JSON.stringify(error));
  }
}
