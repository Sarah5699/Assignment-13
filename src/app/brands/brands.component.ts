import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit{
  brands:any=[]
  constructor(private _ProductsService: ProductsService){}
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts()
  {
    this._ProductsService.getAllBrands().subscribe({
      next:(response)=>{
        console.log(response.data)
        this.brands = response.data;
      }
    })
  }
}
