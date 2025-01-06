import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {LoginService} from "../../service/login.service";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {TokenService} from "../../service/token.service";
import {AccountService} from "../../service/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    HttpClientModule,
    JsonPipe

  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  form: FormGroup;
  errorAuth : string = "" ;


  constructor(private fb: FormBuilder ,
              private loginService: LoginService ,
              private tokenService: TokenService ,
              private accountService: AccountService ,
              private router: Router,
             ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  submit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      this.loginService.login(this.form.value).subscribe({
        next: (data) => this.handleResponse(data),
        error: (err : HttpErrorResponse) => {
          this.errorAuth = err.error?.message ;
          this.form.get('password')?.setValue("") ;
          //console.log('Error :', err.error?.message || 'Unknown error');
        },
      });

    } else {
      const error = [];
      if (!this.form.get("email")?.valid){
        error.push("Invalid email address")
      }
      if (!this.form.get("password")?.valid){
        error.push("Invalid password")
      }
      this.errorAuth = `${error}` ;
    }
  }

  handleResponse(data : any) {
    this.tokenService.handle(data)
    this.accountService.changeStatus(true);
    this.router.navigate(['/home']);
    this.errorAuth = "" ;
  }

}
