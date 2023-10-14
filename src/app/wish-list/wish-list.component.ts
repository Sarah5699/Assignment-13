import { CartService } from '../cart.service';
import { WishListService } from './../wish-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit{
  data:any = [];
  ids: Array<any> = [];
  constructor(private _WishListService: WishListService, private _CartService: CartService) {}
  ngOnInit(): void {
      this._WishListService.getLoggedUserWishlist().subscribe({
        next:(response)=>{
          console.log(response)
          this.data = response.data;
        }
      })
  }
  addToCart(id: string)
  {
    this._CartService.addProductToCart(id);
  }
  removeProductFromWishlist(id:string)
  {
    this._WishListService.removeProductFromWishlist(id).subscribe({
      next:(res)=>{
        this.ids = res.data;
        for (let i=0; i< this.data.length; i++)
        {
          if (!this.ids.includes(this.data[i].id))
          {
            this.data.splice(i,1)
          }
        }
      }
    })
  }
}
