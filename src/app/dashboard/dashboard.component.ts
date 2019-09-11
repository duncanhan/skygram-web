import {Component, OnInit} from '@angular/core';
import {User} from '../user/user.model';

interface Post {
  id: number;
  title: string;
  date: Date;
  location: string;
  likes: User[];
}

@Component({
  selector: 'app-dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      date: new Date(),
      location: 'assets/img/img-post-1.jpg',
      likes: null
    },
    {
      id: 2,
      title: 'Second Post',
      date: new Date(),
      location: 'assets/img/img-post-2.jpg',
      likes: null
    },
    {
      id: 3,
      title: 'Third Post',
      date: new Date(),
      location: 'assets/img/img-post-3.jpg',
      likes: null
    },
    {
      id: 4,
      title: 'Fourth Post',
      date: new Date(),
      location: 'assets/img/img-post-4.jpg',
      likes: null
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  // todo add logic to fetch posts from back end
}
