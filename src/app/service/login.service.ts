import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_CONFIG} from "../../api-config";
import {AccountService} from "./account.service";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root', // Ensures service is globally available
})
export class LoginService {
  private apiUrl = `${API_CONFIG.BASE_URL}/account/login`;


  constructor(private http: HttpClient ,  private tokenService: TokenService,
              private accountService: AccountService , private router: Router) { }


  login(data: { nomColombie: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  public handleResponse(data: any): void {
    this.tokenService.handle(data);
    this.accountService.changeStatus(true);
    if (data) {
      const roles = data.user.roles || [];
      const isAdmin = roles.some((role: any) => role.roleName === 'ROLE_ADMIN');
      const isOrganizer = roles.some((role: any) => role.roleName === 'ROLE_ORGANIZER');
      if (isAdmin) {
        this.router.navigate(['/admin/dashboard']);
      } else if(isOrganizer) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}
