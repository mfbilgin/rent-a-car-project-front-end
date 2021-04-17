import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer;
  dataLoaded = false;
  customerUpdateForm: FormGroup;

  userId: number;
  customerId: number;
  companyName: string;
  phoneNumber: string;
  address: string;
  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomeByUserId();
    this.createUpdateForm();
  }
  getCustomerById(id: number) {
    this.customerService.getCustomerByCustomerId(id).subscribe((response) => {
      this.companyName = response.data.companyName;
      this.address = response.data.address;
      this.phoneNumber = response.data.phoneNumber;
      this.customerId = response.data.customerId;
      this.userId = response.data.userId;
      this.createUpdateForm();
    });
  }
  createUpdateForm() {
    this.customerUpdateForm = this.formBuilder.group({
      userId: [{ value: Number(this.userId), disabled: true }],
      customerId: [{ value: Number(this.customerId), disabled: true }],
      companyName: [this.companyName, Validators.nullValidator],
      phoneNumber: [this.phoneNumber, Validators.required],
      address: [this.address, Validators.nullValidator],
    });
  }
  getCustomeByUserId() {
    this.customerService
      .getCustomerByUserId(Number(this.localStorageService.get('userId')))
      .subscribe((response) => {
        this.customer = response.data;
        if (response.data != null) {
          this.localStorageService.add('customerId', this.customer?.customerId);
          this.getCustomerById(
            Number(this.localStorageService.get('customerId'))
          );
          this.dataLoaded = true;
        }
        this.dataLoaded = true;
      });
  }

  update() {
    if (this.customerUpdateForm.valid) {
      let customerModel: Customer = Object.assign(
        {},
        this.customerUpdateForm.getRawValue()
      );
      customerModel.userId = Number(customerModel.userId);
      customerModel.customerId = Number(customerModel.customerId);
      this.customerService.update(customerModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
        setTimeout(function () {
          location.reload();
        }, 400);
      });
    } else {
      this.toastrService.error(environment.formInvalid, 'Dikkat');
    }
  }
}
