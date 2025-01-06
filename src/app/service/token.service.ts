import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  set(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user_id', data.user.userID);
  }

  handle(data: any) {
    this.set(data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('user_id');
  }

  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }

  decode(payload : any) {
    return JSON.parse(atob(payload));
  }

  payload(token: any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  isValid() {
    const token = this.getToken();
    const userId = this.getUserId();

    if(token){
      const payload = this.payload(token);
      if(payload){
        return userId == payload.userID
      }
    }
    return false;
  }

  getInfo() {
    const token = this.getToken();
    if(token){
      const payload = this.payload(token);
      return payload ? payload : null;
    }
    return null;
  }

  loggedIn(){
    return this.isValid();
  }
}
