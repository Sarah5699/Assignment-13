import { CartService } from './../cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit{
  userData!:any;
  data: any = [];
  constructor(private _AuthService: AuthService, private _CartService: CartService){}
  ngOnInit(): void {
    this.userData = this._AuthService.decodeToken();
    this._CartService.getAllOrders(this.userData.id).subscribe({
      next:(response)=>{
        this.data= response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
