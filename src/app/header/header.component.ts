import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  token: string = localStorage.getItem('token');

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('').then(() => window.location.reload());
  }
}
