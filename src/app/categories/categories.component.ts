import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  categories: any = [];
  constructor(private _ProductsService: ProductsService){}
  
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
