import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './component/car/car.component';
import { CardetailComponent } from './component/cardetail/cardetail.component';
import { CreditCardComponent } from './component/credit-card/credit-card.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
