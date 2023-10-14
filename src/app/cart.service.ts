import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl:string = 'https://ecommerce.routemisr.com'
  numOfCartItems = new BehaviorSubject(0);
  header:any = {
    'token': localStorage.getItem('userToken')
  }
  constructor(private _HttpClient: HttpClient) {
    this.getLoggedUserCart().subscribe({
      next:(response)=>{
        this.numOfCartItems.next(response.numOfCartItems);
      }
    })
  }

  addProductToCart(productId: string): Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,{productId:productId}, {headers:this.header})
  }
  getLoggedUserCart(): Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`, {headers:this.header})
  }
  onlinePayment(shippingAddress: any, cartId: string): Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{shippingAddress:shippingAddress},{headers: this.header})
  }
  getAllOrders(userId: string): Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/orders/user/${userId}`)
  }
  removeCartItem(productId: string):Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${productId}`, {headers:this.header})
  }
  updateproductQuantity(productId: string, count: number):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${productId}`, {count: count}, {headers:this.header})
  }
  clearUserCart():Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`, {headers:this.header})
  }
}
