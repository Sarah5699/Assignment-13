import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent {
  loading: boolean = false;
  constructor(private _loader: LoaderService) { 
    _loader.loading.subscribe({
      next:(value)=>{
        this.loading = value;
      }
    })
  }
}
