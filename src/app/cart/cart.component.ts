import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartDetails: any = {};
  numOfCartItems: number = 0;
  success : boolean = false;
  constructor(private _CartService: CartService, private _Router: Router){}
  ngOnInit(): void {
    this.getLoggedUserCart();
  }
  getLoggedUserCart()
  {
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) =>{
        console.log(response)
        /*if (response.numOfCartItems == 1 && response.data.products[0].count == 0)
        {
          this.success = false;
          this.numOfCartItems = 0;
          this.cartDetails = [];
          this._CartService.numOfCartItems.next(0);
        }
        else
        {*/
        this.success = true;
        this.numOfCartItems = response.numOfCartItems;
        this.cartDetails = response.data;
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        //}
      },
      error:(error)=>{
        console.log(error)
        this.success = false;
      }
    })
  }
  checkout(id:string)
  {
    this._Router.navigate([`checkout/${id}`])
  }
  removeCartItem(id:string)
  {
    if(this.numOfCartItems == 1)
    {
      this.clearUserCart();
    }
    else{
    this._CartService.removeCartItem(id).subscribe({
      next:(response)=>{
        this.numOfCartItems = response.numOfCartItems;
        this.cartDetails = response.data;
        this._CartService.numOfCartItems.next(response.numOfCartItems)
      }
    })
  }
  }
  updateProductQuantity(id: string, count: number)
  {
    if (count == 0)
    {
      this.removeCartItem(id);
    }
    else
    {
      this._CartService.updateproductQuantity(id, count).subscribe({
        next:(response)=>{
          this.numOfCartItems = response.numOfCartItems;
          this.cartDetails = response.data;
          this._CartService.numOfCartItems.next(response.numOfCartItems)
        }
      })
  }
  }
  clearUserCart()
  {
    this._CartService.clearUserCart().subscribe({
      next:(response)=>{
        this.numOfCartItems = 0;
        this.cartDetails = [];
        this._CartService.numOfCartItems.next(0)
        this.success = false;
      }
    })
  }
}
