import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post-model';

@Component({
  selector: 'app-dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [
  ];
  constructor() { }

  ngOnInit() {
  }

  // todo add logic to fetch posts from back end

}
