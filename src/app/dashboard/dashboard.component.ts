import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post-model';
import {Router} from '@angular/router';
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
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.router.navigateByUrl('/login');
    }
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

  handleError(error: string): void {
    console.log('Could not fetch content from server: ' + JSON.stringify(error));
  }

  // todo add logic to fetch posts from back end

}
