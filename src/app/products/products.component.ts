import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './../products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  constructor(private _ProductsService: ProductsService, private _Router: Router, private _CartService: CartService, private toastr: ToastrService){}

  ngOnInit(): void {
      this.getAllProducts()
  }
  getAllProducts()
  {
    this._ProductsService.getAllProducts().subscribe({
      next: (response)=>{
        console.log(response)
        this.products = response.data
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
        console.log(response)
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        this.toastr.success('The Product was added Successfully to your cart');
      },
      error:(error)=>{
        this.toastr.error(error.message);
      }
    })
  }
}
