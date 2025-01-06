import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Ensures service is globally available
})
export class LoginService {
  private apiUrl = 'http://localhost:8443/account/login';

  constructor(private http: HttpClient) { }


  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }


}
