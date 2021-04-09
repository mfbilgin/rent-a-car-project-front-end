import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './component/brandComponents/brand-add/brand-add.component';
import { CarAddComponent } from './component/carComponents/car-add/car-add.component';
import { CarUpdateComponent } from './component/carComponents/car-update/car-update.component';
import { CarComponent } from './component/carComponents/car/car.component';
import { CardetailComponent } from './component/carComponents/cardetail/cardetail.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ColorAddComponent } from './component/colorComponents/color-add/color-add.component';
import { CustomerAddComponent } from './component/customerComponents/customer-add/customer-add.component';
import { CustomerComponent } from './component/customerComponents/customer/customer.component';
import { ImageAddComponent } from './component/imageComponents/image-add/image-add.component';
import { ImageDeleteComponent } from './component/imageComponents/image-delete/image-delete.component';
import { LoginComponent } from './component/login/login.component';
import { PaymentComponent } from './component/payment/payment.component';
import { RegisterComponent } from './component/register/register.component';
import { RentCarComponent } from './component/rent-car/rent-car.component';
import { RentalComponent } from './component/rental/rental.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { LoginGuard } from './guards/login.guard';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CarComponent,
  },
  { path: 'cars', component: CarComponent },
  {
    path: 'customers',
    component: CustomerComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/cardetail/:carId',
    component: CardetailComponent,
    canActivate: [LoginGuard],
  },

  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },

  { path: 'cars/rent', component: PaymentComponent, canActivate: [LoginGuard] },
  { path: 'rentals', component: RentalComponent, canActivate: [LoginGuard] },
  { path: 'rentCar', component: RentCarComponent, canActivate: [LoginGuard] },
  {
    path: 'payment/:rental',
    component: PaymentComponent,
    canActivate: [LoginGuard],
  },
  { path: 'cars/add', component: CarAddComponent, canActivate: [LoginGuard] },
  {
    path: 'brands/add',
    component: BrandAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'colors/add',
    component: ColorAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'customers/add',
    component: CustomerAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/update/:carId',
    component: CarUpdateComponent,
    canActivate: [LoginGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: UserDetailComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'image/add',
    component: ImageAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'image/delete',
    component: ImageDeleteComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
