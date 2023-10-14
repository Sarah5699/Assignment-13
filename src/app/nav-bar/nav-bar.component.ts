import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  isLogin:boolean = false;
  numOfCartItems: number = 0;
  constructor(private _AuthService: AuthService, private _Router: Router, private _CartService: CartService)
  {
    _AuthService.userToken.subscribe({
      next: (value)=>{
        if (value != null)
        {
          this.isLogin = true;
        }
      }
    })
  }

  ngOnInit(): void {
    this._CartService.numOfCartItems.subscribe({
      next:(value)=>{
        this.numOfCartItems = value;
      }
    })
  }

  logout()
  {
  localStorage.removeItem("userToken");
  this._AuthService.userToken.next(null);
  this._Router.navigate(['/login']);
  this.isLogin = false;
  }
}
