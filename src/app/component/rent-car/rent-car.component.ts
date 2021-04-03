import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/car/carDetails';
import { Customer } from 'src/app/models/customer/customer';
import { Rental } from 'src/app/models/rental/rental';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
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
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService
  ) {}
  customers: Customer[];
  customerId: Number;
  rentDate: Date;
  returnDate: Date;

  @Input() car: CarDetails;
  ngOnInit(): void {
    this.getCustomerByUserId(Number(this.localStorageService.get('userId')));
  }

  getCustomerByUserId(userId: number) {
    this.customerService.getCustomerByUserId(userId).subscribe((response) => {
      if (response.data.length == 0) {
        this.toastrService.info(
          'Araç Kiralayabilmek İçin Müşteri Formunu Doldurunuz',
          'Dikkat'
        );
        this.router.navigate(['customers/add']);
      } else {
        this.customers = response.data;
      }
    });
  }
  getRentMinDate() {
    var today = new Date();
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
      customerId: parseInt(this.localStorageService.get('customerId')),
      userId: parseInt(this.localStorageService.get('userId')),
    };
    this.toastrService.info('Ödeme Sayfasına Yönlendiliyorsunuz');
    this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
  }
}
