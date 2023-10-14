import { authGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BrandsComponent } from './brands/brands.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home', canActivate: [authGuard], component:HomeComponent},
  {path:'cart', canActivate: [authGuard],component:CartComponent},
  {path:'wishList', canActivate: [authGuard],component:WishListComponent},
  {path:'categories', canActivate: [authGuard],component:CategoriesComponent},
  {path:'products', canActivate: [authGuard],component:ProductsComponent},
  {path:'product details/:id', canActivate: [authGuard],component:ProductDetailsComponent},
  {path:'brands', canActivate: [authGuard],component:BrandsComponent},
  {path:'checkout/:id', canActivate: [authGuard],component:CheckOutComponent},
  {path:'login', component:LoginComponent},
  {path:'forgetPass',component:ForgetPassComponent},
  {path:'regester', component:RegisterComponent},
  {path:'allorders', canActivate: [authGuard], component:AllOrdersComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
