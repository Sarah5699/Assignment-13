import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isLogin:boolean = false;
  constructor(private _AuthService: AuthService)
  {
    _AuthService.userToken.subscribe({
      next: (value)=>{
        if (value != null)
        {
          this.isLogin = true;
        }
      }
    })
  }
}
