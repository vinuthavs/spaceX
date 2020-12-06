import { Component, OnInit } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { AppService } from './app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'space-app';
  spaceData: any;
  errorMsg: string = '';
  msg: string = '';
  requestData: any = {};
  filterYears = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
  filterBools = ['true', 'false'];
  subscription: Subscription = new Subscription();

  constructor(private appService: AppService) { }

  ngOnInit() {
   this.userInputFunc(null, '');
  }

  userInputFunc (itemSelected: any, type: string) {
   this.msg = '';
    let params = new HttpParams();
    if(type !== '') {
      this.requestData[type] = itemSelected;
    }
    Object.keys(this.requestData).forEach((key) => {
      params = params.append(key, this.requestData[key]);
    });
    this.subscription.add(this.appService.fetchSpaceRecords(params).subscribe(res => {
      if(Object.keys(res).length !== 0) {
        this.spaceData = res;
      } else {
        this.msg = "No data available. Kindly update filters!"
      }
    }));
  }
}
