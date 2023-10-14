import { AuthService } from './../auth.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  /*regesterForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(9)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  });*/
  isLoading:boolean = false;

  regesterForm: FormGroup;

  error_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minlength', message: 'The Length of the Name Must Not Be Less Than 3' },
      { type: 'maxlength', message: 'The Length of the Name Must Not Be More Than 9' },
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'please enter a valid email address.' }
    ],

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'rePassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'phone': [
      {type: 'reuired', message: 'Phone Number is Required.'},
      {type: 'pattern', message: 'Please Enter a Valid Phone Number.'}
    ]
  }

  constructor(public formBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router) 
  {
    this.regesterForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(9)]),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      rePassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('rePassword')?.value;
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  handleRegister(registerForm: FormGroup)
  {
    this.isLoading = true;
    this._AuthService.register(registerForm.value).subscribe({
      next:(response)=>{
        this.isLoading = false;
        this._Router.navigate(['/login']);
      },
      error: (error)=>{
        this.isLoading = false;
        console.log(error)
      }
    })
  }
}
