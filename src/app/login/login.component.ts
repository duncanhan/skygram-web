import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private loginService: LoginService, private alert: ToastrService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('');
    }
  }
  onSubmit() {
    const account = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.loginService.login(account, password).subscribe(res => {
      if (res.code === 200) {
        localStorage.setItem('username', account);
        localStorage.setItem('token', res.data);
        const data = jwt_decode(res.data);
        localStorage.setItem('first_name', data.first_name);
        localStorage.setItem('last_name', data.last_name);
        this.alert.success('Welcome to SkyGram ' + data.first_name + ' ' + data.last_name + '.');
        this.router.navigateByUrl('');
      }
    }, err => {
        this.alert.error('Username or password was wrong!');
    });
  }
}
