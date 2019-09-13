import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

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
    return this.httpClient.post(environment.endpoint + '/login', data);
  }
}
