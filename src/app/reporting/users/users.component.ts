import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
  public daysChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'line';
  public barChartLegend = true;
  public daysUsersAndPostsChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Users'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Posts'}
  ];
}
