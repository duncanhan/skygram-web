import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  uploadForm: FormGroup;
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });

  usersData = [];
  postsData = [];
  lables = [];

  constructor(private httpClient: HttpClient,private formBuilder: FormBuilder) {
    // this.lables = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    // this.usersData = [65, 59, 80, 81, 56, 55, 40];
    // this.postsData = [28, 48, 40, 19, 86, 27, 90];
  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      from: '',
      to: ''
    });
  }

  onSubmit(): void {
    const url = environment.url + '/reports?from='+this.uploadForm.value.from+'&to='+this.uploadForm.value.to;
    console.log(url);
    this.httpClient.get<ReportResponse>(url, {headers: this.headers}).subscribe(
      response => {
        if (response.code === 200) {
          let data = response.data;
          this.usersData = [];
          this.postsData = [];
          this.lables = [];
          for(let i=0; i<data.length;i++){
            this.usersData.push(data[i].num_of_registrations);
            this.postsData.push(data[i].num_of_posts);
            this.lables.push(data[i].date);
          }
          this.daysUsersAndPostsChartData = [
            {data: this.usersData, label: 'Users'},
            {data: this.postsData, label: 'Posts'}
          ];
          this.daysChartLabels = this.lables;
        }
      }, error => {
        this.handleError(error);
      });
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements: {
      line: {
        fill: false
      }
    }
  };

  public daysChartLabels = this.lables;
  public barChartType = 'line';
  public barChartLegend = true;
  public daysUsersAndPostsChartData = [
    {data: this.usersData, label: 'Users'},
    {data: this.postsData, label: 'Posts'}
  ];

  handleError(error: string): void {
    console.log('Could not fetch content from server: ' + JSON.stringify(error));
  }
}

export interface ReportResponse {
  code: number;
  message: string;
  data: ReportData[];
}

export interface ReportData {
      date: string,
      num_of_registrations: number,
      num_of_posts: number
}
