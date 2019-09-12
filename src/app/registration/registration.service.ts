import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  public register(username: string, password: string, first_name: string, last_name: string, email: string, birthday: Date, phone: string)
  : Observable<any> {
    const regisData = {
      username,
      password,
      first_name,
      last_name,
      email,
      birthday,
      phone
    };
    return this.httpClient.post('http://3.229.181.91/register', regisData);
  }
}
