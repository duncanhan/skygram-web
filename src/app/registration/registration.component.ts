import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regisForm: FormGroup;
  constructor(private fb: FormBuilder, private regisService: RegistrationService,
  private router: Router, private alert: ToastrService, private loginService: LoginService) {
    this.createForm();
  }

  createForm() {
    this.regisForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthday: [''],
      phone: ['']
    });
  }
  ngOnInit() {
  }
  onSubmit() {
    const regisData = {
      username: this.regisForm.value.username,
      password: this.regisForm.value.password,
      firstName: this.regisForm.value.firstName,
      lastName: this.regisForm.value.lastName,
      email: this.regisForm.value.email,
      birthday: this.regisForm.value.birthday,
      phone: this.regisForm.value.phone
    };
    this.regisService.register(regisData.username, regisData.password, regisData.firstName, regisData.lastName, regisData.email,
      regisData.birthday, regisData.phone).subscribe(res2 => {
        this.loginService.login(regisData.username, regisData.password).subscribe(res => {
          if (res.code === 200) {
            localStorage.setItem('username', regisData.username);
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
    }, err => {
      console.log(err)
      this.alert.error('Failed to register, please try again');
    });
  }
}
