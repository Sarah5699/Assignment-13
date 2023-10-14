import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-slider',
  templateUrl: './categories-slider.component.html',
  styleUrls: ['./categories-slider.component.scss']
})
export class CategoriesSliderComponent implements OnInit{
  categories: any = [];
  constructor(private _ProductsService: ProductsService){}
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
        items: 7
      }
    },
    nav: true
  }

  ngOnInit(): void {
      this.getAllCat();
  }

  getAllCat(){
    this._ProductsService.getAllCategories().subscribe({
      next:(response)=>{
        console.log(response.data)
        this.categories = response.data;
      }
    })
  }
}
