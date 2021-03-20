import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { Customer } from 'src/app/models/customer/customer';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { CarService } from 'src/app/services/car/car.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css'],
})
export class RentCarComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private toastr: ToastrService
  ) {}
  customers: Customer[];
  customerId: Number;
  rentDate: Date;
  returnDate: Date;
  @Input() car: Car;
  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.customerService.getCustomer().subscribe((response) => {
      this.customers = response.data;
      //this.dataLoaded = true;
    });
  }
  getRentMinDate() {
    var today = new Date();
    //min="1980-01-01"
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }
  getReturnMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0, 10);
  }
  createRental() {
    let MyRental: Rental = {
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      carId: this.car.carId,
      customerId: parseInt(this.customerId.toString()),
      userId: parseInt(this.customerId.toString()),
    };
    this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
    this.toastr.info(
      'Ödeme sayfasına yönlendiriliyorsunuz...',
      'Ödeme İşlemleri'
    );
    /*
    this.rentalService.rentalCar(MyRental).subscribe(response => {
      this.toastr.success(response.message.toString(), "Harika...");
    })
    */
  }
}
