import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router){}
  loginErr:string='';
  isLoading:boolean = false;
  loginForm = new FormGroup({
    "email" : new FormControl(null, [Validators.required, Validators.email]),
    "password" : new FormControl(null, [Validators.required]),
  })

  handleLogin(loginForm: FormGroup)
  {
    this.isLoading = true;
    this._AuthService.login(loginForm.value).subscribe({
      next: (response)=>{
        this.isLoading = false;
        localStorage.setItem("userToken",response.token);
        this._AuthService.userToken.next(localStorage.getItem('userToken'))
        this._Router.navigate(['/home']);
      },
      error: (error)=>{
        this.isLoading = false;
        this.loginErr = error.message;
      }
    })
  }
}
