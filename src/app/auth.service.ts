import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin:boolean = false;
  //userToken:string|null = localStorage.getItem('userToken');
  userToken: BehaviorSubject<any> = new BehaviorSubject(localStorage.getItem('userToken'));

  baseUrl:string = 'https://ecommerce.routemisr.com'
  constructor(private _HttpClient: HttpClient) { }

  register(userData: any): Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`,userData)
  }

  login(userData: any): Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`,userData)
  }

  getLoggedUserAddress(): Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/addresses`,{headers:{'token': localStorage.getItem('userToken')}})
  }
  decodeToken()
  {
    return(jwtDecode(JSON.stringify(localStorage.getItem('userToken'))));
  }
  forgetPass(forgetPassword: any):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`,forgetPassword)
  }
  verifyCode(resetCode: any):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`,resetCode)
  }
  resetPass(resetPasword: any):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`,resetPasword)
  }
}