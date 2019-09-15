import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });
  usersData: any[];
  postsData: any[];
  lables: any[];
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  getReport(): void {
    const url = environment.url + '/reports?from=2019-09-01&to=2019-10-30';
    this.httpClient.get<ReportResponse>(url, {headers: this.headers}).subscribe(
      response => {
        if (response.code === 200) {
          response.data.forEach(function(element) {
            console.log(element);
            this.usersData.push(element.num_of_registration);
            this.postsData.push(element.num_of_posts);
            this.lables.push(element.date);
          });
        }
      }, error => {
        this.handleError(error);
      });
  }
// {
//   "code": 200,
//   "message": "success",
//   "data": [
//     {
//       "date": "2019-09-01",
//       "num_of_registration": 0,
//       "num_of_posts": 0
//     },

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements: {
      line: {
        fill: false
      }
    }
  };
  public daysChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'line';
  public barChartLegend = true;
  public daysUsersAndPostsChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Users'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Posts'}
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
      date: Date,
      num_of_registration: number,
      num_of_posts: number
}
