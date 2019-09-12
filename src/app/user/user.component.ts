import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {Post} from '../models/post-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      date: new Date(),
      location: 'assets/img/img-post-4.jpg',
      likes: null
    },
    {
      id: 2,
      title: 'Second Post',
      date: new Date(),
      location: 'assets/img/img-post-5.jpg',
      likes: null
    },
    {
      id: 3,
      title: 'Third Post',
      date: new Date(),
      location: 'assets/img/img-post-6.jpg',
      likes: null
    },
    {
      id: 4,
      title: 'Fourth Post',
      date: new Date(),
      location: 'assets/img/img-post-7.jpg',
      likes: null
    },
    {
      id: 5,
      title: 'Fourth Post',
      date: new Date(),
      location: 'assets/img/img-post-8.jpg',
      likes: null
    },
    {
      id: 6,
      title: 'Fourth Post',
      date: new Date(),
      location: 'assets/img/img-post-9.jpg',
      likes: null
    }];
  constructor() { }

  ngOnInit() {
  }

  onSelect(user: User): void {
    console.log(user.username);
  }
}
