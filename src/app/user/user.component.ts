import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[] = [{
    id: 1,
    username: 'Windstorm',
    signUpDate: null,
    email: 'john',
    dateOfBirth: null,
    password: '123'
  },
  {
    id: 1,
    username: 'Sandstorm',
    signUpDate: null,
    email: 'john',
    dateOfBirth: null,
    password: '123'
  },
  {
    id: 1,
    username: 'Shitstorm',
    signUpDate: null,
    email: 'john',
    dateOfBirth: null,
    password: '123'
  }];
  constructor() { }

  ngOnInit() {
  }

  onSelect(user: User): void {
    console.log(user.username);
  }
}
