import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post-model';
import {Router} from '@angular/router';
import {User} from "../models/user.model";

@Component({
  selector: 'app-dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  wtf: User[]= []; // who to follow
  posts: Post[] = [
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.router.navigateByUrl('/login');
    }
  }

  // todo add logic to fetch posts from back end

}
