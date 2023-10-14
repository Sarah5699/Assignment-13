import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
FormControl
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit{
  cartId: string = '';
  constructor(private _CartService: CartService, private _ActivatedRoute: ActivatedRoute){}
  shippingAddress: FormGroup = new FormGroup({
    details : new FormControl(''),
    phone : new FormControl(''),
    city : new FormControl('')
  })

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe((params)=>{
        this.cartId = params.get('id')
      })
  }

  handleSubmit(shippingAddress: FormGroup)
  {
    this._CartService.onlinePayment(shippingAddress.value,this.cartId).subscribe({
      next:(response)=>{
        window.location.href = response.session.url;
      }
    })
  }
}
