import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {Post} from '../models/post-model';
import {HttpClient} from '@angular/common/http';
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

  constructor(private httpClient: HttpClient, ) {}

  ngOnInit() {
    const username = localStorage.getItem('username');
    console.log(username);
    this.getUserDetails(username);
    this.getUserPosts(username);
  }

  onSelect(user: User): void {
    console.log(user.username);
  }

  getUserDetails(username: string): void {
    const url = environment.endpoint + '/users/' + username;
    console.log(url)
    this.httpClient.get<UserResponse>(url).subscribe(
      response => {
        if (response.code === 200) {
          console.log(response); // debug
          this.user = response.data as User;
        }
      }, error => {
        this.handleError(error);
      }, () => {
        console.log('all done');
      });
  }

  getUserPosts(username: string): void {
    this.httpClient.get<PostResponse>(environment.endpoint + '/users/' + username + '/posts').subscribe(
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
