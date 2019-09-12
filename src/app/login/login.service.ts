import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public login(account: string, password: string): Observable<any> {
    const data = {
      account,
      password
    };
    return this.httpClient.post('http://10.10.70.171:8080/login', data);
  }
}
