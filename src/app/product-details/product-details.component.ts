import { ProductsService } from './../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  
  product!: any;
  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductsService: ProductsService, private _CartService: CartService, private toastr: ToastrService){}
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe((params)=>{
        this._ProductsService.getSpecificProduct(params.get('id')).subscribe({
          next: (response)=>{
            console.log(response.data)
            this.product = response.data;
          }
        })
      })
  }
  addToCart(id:string)
  {
    this._CartService.addProductToCart(id).subscribe({
      next:(response)=>{
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        this.toastr.success('The Product was added Successfully to your cart');
      },
      error:(error)=>{
        this.toastr.error(error.message);
      }
    })
  }
}
