import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  constructor(private _HttpClient: HttpClient) { }
  getAllCategories(): Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`)
  }
  getAllProducts(): Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products`)
  }
  getSpecificProduct(productId: string): Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${productId}`)
  }
  getAllBrands():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands`)
  }
}
