import { WishListService } from './../wish-list.service';
import { Router } from '@angular/router';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  products: any = [];
  withlist: any = [];
  withlistOnOpen: any = [];
  ids:Array<any>;
  idsOnOpen: Array<any>;
  constructor(private _ProductsService: ProductsService, private _Router: Router, private _CartService: CartService, private _WishListService: WishListService, private toastr: ToastrService){}

  ngOnInit(): void {
      this.getAllProducts()
  }

  getAllProducts()
  {
    this.idsOnOpen = [];
    this._ProductsService.getAllProducts().subscribe({
      next: (response)=>{
        this.products = response.data;
        this._WishListService.getLoggedUserWishlist().subscribe({
          next:(resp)=>{
            this.withlistOnOpen = resp.data;
            for(let i=0; i<this.withlistOnOpen.length; i++){
              this.idsOnOpen.push(this.withlistOnOpen[i].id);
            }
            for(let i=0; i<this.products.length; i++)
            {
              if (this.idsOnOpen.includes(this.products[i].id))
              {
                let className = "product-" + i;
                document.getElementById(className).style.color = "red";
              }
            }
          }
        })
      }
    })
  }
  showProductDetails(id: string)
  {
    this._Router.navigate([`product details/${id}`])
  }
  addToCart(id: string)
  {
    this._CartService.addProductToCart(id).subscribe({
      next:(response)=>{
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        this.toastr.success('The Product was added Successfully to your cart');
      },
      error:(error)=>{
        this.toastr.error(error.message)
      }
    })
  }
  addToOrRemoveFromWishlist(index:number, id: string)
  { 
    let idName = "product-" + index;
    this.ids = [];
    this._WishListService.getLoggedUserWishlist().subscribe({
      next:(response)=>{
        this.withlist = response.data;
        for(let i=0; i<this.withlist.length; i++){
          this.ids.push(this.withlist[i].id);
        }
        if (this.ids.includes(id)){
          document.getElementById(idName).style.color = "black";
          this._WishListService.removeProductFromWishlist(id).subscribe({
            next:(res)=>{
              this.toastr.success('The Product was removed Successfully to your wishlist');
            },
            error:(error)=>{
              this.toastr.error(error.message);
            }
          })
        }
        else{
          document.getElementById(idName).style.color = "red";
          this._WishListService.addProductToWishlist(id).subscribe({
            next:(res)=>{
              this.toastr.success('The Product was added Successfully to your wishlist');
            },
            error:(error)=>{
              this.toastr.error(error.message);
            }
          })
        }
      }
    })
  }
}