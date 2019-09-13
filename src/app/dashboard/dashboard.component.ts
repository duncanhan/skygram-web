import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post-model';
import {Params, Router} from '@angular/router';
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PostResponse} from "../models/post-response.model";

@Component({
  selector: 'app-dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  wtf: User[]= []; // who to follow
  posts: Post[] = [];
  username: String;
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.router.navigateByUrl('/login');
    }
    this.username = localStorage.getItem('username');
    this.getPosts();
    this.getUsers();
  }

  getUsers(): void {
    const url = environment.url + '/users';
    this.httpClient.get<PostResponse>(url, {headers: this.headers}).subscribe(
      response => {
        if (response.code === 200) {
          this.wtf = response.data.content as unknown as User[];
        }
      }, error => {
        this.handleError(error);
      });
  }

  getPosts(): void {
    const url = environment.url + '/posts/timeline';
    this.httpClient.get<PostResponse>(url, {headers: this.headers}).subscribe(
      response => {
        console.log(response.data.content);
        if (response.code === 200) {
          this.posts = response.data.content as unknown as Post[];
        }
      }, error => {
        this.handleError(error);
      });
  }

  handleError(error: string): void {
    console.log('Could not fetch content from server: ' + JSON.stringify(error));
  }

  follow(username) {
    const url = environment.url + '/users/' + username + "/follow";
    this.httpClient.post<any>(url, [], {headers: this.headers}).subscribe(
      response => {
        console.log(response);
        if (response.code === 200) {
          console.log(response.message);

        }
      },
      error => {
        this.handleError(error);
      });
  }

}
