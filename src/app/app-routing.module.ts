import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './component/brand-add/brand-add.component';
import { CarAddComponent } from './component/car-add/car-add.component';
import { CarImageAddComponent } from './component/car-image-add/car-image-add.component';
import { CarComponent } from './component/car/car.component';
import { CardetailComponent } from './component/cardetail/cardetail.component';
import { ColorAddComponent } from './component/color-add/color-add.component';
import { CustomerAddComponent } from './component/customer-add/customer-add.component';
import { CustomerComponent } from './component/customer/customer.component';
import { PaymentComponent } from './component/payment/payment.component';
import { RentCarComponent } from './component/rent-car/rent-car.component';
import { RentalComponent } from './component/rental/rental.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'cars/cardetail/:carId', component: CardetailComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/rent', component: PaymentComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'rentCar', component: RentCarComponent },
  { path: 'payment/:rental', component: PaymentComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'colors/add', component: ColorAddComponent },
  { path: 'customers/add', component: CustomerAddComponent },
  { path: 'images/add', component: CarImageAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
