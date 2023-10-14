import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  baseUrl:string = 'https://ecommerce.routemisr.com';
  header:any = {
    'token': localStorage.getItem('userToken')
  }
  constructor(private _HttpClient: HttpClient) { }
  
  addProductToWishlist(productId: string): Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,{productId: productId},{headers: this.header})
  }
  removeProductFromWishlist(productId: string): Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${productId}`,{headers: this.header})
  }
  getLoggedUserWishlist(): Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`,{headers: this.header})
  }
}
