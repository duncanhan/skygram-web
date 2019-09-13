import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class CreatePostService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Headers' : '*',
      'Content-Type': 'application/json',
    }).set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };

  constructor(private httpClient: HttpClient) { }

  public createPost(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(environment.url+'/posts', formData, this.httpOptions);
  }
}
