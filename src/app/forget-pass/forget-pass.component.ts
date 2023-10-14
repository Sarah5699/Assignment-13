import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent {
  firstStep: boolean = false;
  secondStep: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router){}
  forgetPassword: FormGroup = new FormGroup({
    email: new FormControl('')
  })
  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('')
  })
  resetPasword: FormGroup = new FormGroup({
    email: new FormControl(''),
    newPassword: new FormControl('')
  })
  forgetPass(forgetPassword: FormGroup)
  {
    this._AuthService.forgetPass(forgetPassword.value).subscribe({
      next:(res)=>{
        this.firstStep = true
      }
    })
  }
  verifyCode(resetCodeForm: FormGroup)
  {
    this._AuthService.verifyCode(resetCodeForm.value).subscribe({
      next:(res)=>{
        this.secondStep = true
      }
    })
  }
  resetPass(resetPasword: FormGroup)
  {
    this._AuthService.resetPass(resetPasword.value).subscribe({
      next:(res)=>{
        localStorage.setItem("userToken",res.token);
        this._AuthService.userToken.next(localStorage.getItem('userToken'))
        this._Router.navigate(['/home']);
      }
    })
  }
}
