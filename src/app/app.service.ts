import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  api_url: string = "https://api.spaceXdata.com/v3/launches?limit=100";

  fetchSpaceRecords = (params: any) => {
      return this.http.get(this.api_url, {params: params});
  }
}
