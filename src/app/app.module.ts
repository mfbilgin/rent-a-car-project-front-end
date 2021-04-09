import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './component/brandComponents/brand/brand.component';
import { NaviComponent } from './component/navi/navi.component';
import { ColorComponent } from './component/colorComponents/color/color.component';
import { CustomerComponent } from './component/customerComponents/customer/customer.component';
import { CarComponent } from './component/carComponents/car/car.component';
import { RentalComponent } from './component/rental/rental.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardetailComponent } from './component/carComponents/cardetail/cardetail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipePipe } from './pipes/car/filter-pipe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrandFilterPipePipe } from './pipes/brand/brand-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color/color-filter-pipe.pipe';
import { PaymentComponent } from './component/payment/payment.component';
import { RentCarComponent } from './component/rent-car/rent-car.component';
import { CarAddComponent } from './component/carComponents/car-add/car-add.component';
import { BrandAddComponent } from './component/brandComponents/brand-add/brand-add.component';
import { ColorAddComponent } from './component/colorComponents/color-add/color-add.component';
import { CustomerAddComponent } from './component/customerComponents/customer-add/customer-add.component';
import { CarUpdateComponent } from './component/carComponents/car-update/car-update.component';
import { LoginComponent } from './component/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './component/register/register.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { CustomerDetailComponent } from './component/customerComponents/customer-detail/customer-detail.component';
import { CustomerNullComponent } from './component/customerComponents/customer-null/customer-null.component';
import { ImageAddComponent } from './component/imageComponents/image-add/image-add.component';
import { CarDeleteComponent } from './component/carComponents/car-delete/car-delete.component';
import { ImageDeleteComponent } from './component/imageComponents/image-delete/image-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    NaviComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CardetailComponent,
    VatAddedPipe,
    FilterPipePipe,
    BrandFilterPipePipe,
    ColorFilterPipePipe,
    PaymentComponent,
    RentCarComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    CustomerAddComponent,
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    UserDetailComponent,
    ChangePasswordComponent,
    CustomerDetailComponent,
    CustomerNullComponent,
    ImageAddComponent,
    CarDeleteComponent,
    ImageDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
