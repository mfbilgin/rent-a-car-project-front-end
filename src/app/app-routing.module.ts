import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './component/brandComponents/brand-add/brand-add.component';
import { CarAddComponent } from './component/carComponents/car-add/car-add.component';
import { CarUpdateComponent } from './component/carComponents/car-update/car-update.component';
import { CarComponent } from './component/carComponents/car/car.component';
import { CardetailComponent } from './component/carComponents/cardetail/cardetail.component';
import { ChangePasswordComponent } from './component/authComponents/change-password/change-password.component';
import { ColorAddComponent } from './component/colorComponents/color-add/color-add.component';
import { CustomerAddComponent } from './component/customerComponents/customer-add/customer-add.component';
import { CustomerComponent } from './component/customerComponents/customer/customer.component';
import { ImageAddComponent } from './component/imageComponents/image-add/image-add.component';
import { ImageDeleteComponent } from './component/imageComponents/image-delete/image-delete.component';
import { LoginComponent } from './component/authComponents/login/login.component';
import { NotFoundComponent } from './component/fixPages/not-found/not-found.component';
import { PaymentComponent } from './component/rentComponents/payment/payment.component';
import { RegisterComponent } from './component/authComponents/register/register.component';
import { RentCarComponent } from './component/rentComponents/rent-car/rent-car.component';
import { RentalComponent } from './component/rentComponents/rental/rental.component';
import { UserDetailComponent } from './component/userComponents/user-detail/user-detail.component';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { SavedCardComponent } from './component/cardComponents/saved-card/saved-card.component';
import { ClaimAddComponent } from './component/userComponents/claim-add/claim-add.component';
import { ForgotPasswordComponent } from './component/authComponents/forgot-password/forgot-password.component';
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
    canActivate: [AdminGuard],
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
  { path: 'rentals', component: RentalComponent, canActivate: [AdminGuard] },
  { path: 'rentCar', component: RentCarComponent, canActivate: [LoginGuard] },
  {
    path: 'payment/:rental',
    component: PaymentComponent,
    canActivate: [LoginGuard],
  },
  { path: 'cars/add', component: CarAddComponent, canActivate: [AdminGuard] },
  {
    path: 'brands/add',
    component: BrandAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'colors/add',
    component: ColorAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'customers/add',
    component: CustomerAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/update/:carId',
    component: CarUpdateComponent,
    canActivate: [AdminGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: UserDetailComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cards',
    component: SavedCardComponent,
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
    canActivate: [AdminGuard],
  },
  {
    path: 'image/add/:carId',
    component: ImageAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'image/delete',
    component: ImageDeleteComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'claim/add',
    component: ClaimAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
