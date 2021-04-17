import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
})
export class CustomerAddComponent implements OnInit {
  customerAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCustomerAddForm();
  }

  createCustomerAddForm() {
    this.customerAddForm = this.formBuilder.group({
      companyName: ['', Validators.nullValidator],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.nullValidator],
      userId: [this.localStorageService.get('userId'), Validators.required],
    });
  }

  add() {
    if (this.customerAddForm.valid) {
      let customerModel = Object.assign({}, this.customerAddForm.value);
      customerModel.userId = Number(customerModel.userId);
      this.customerService.add(customerModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['profile']);
          setTimeout(function () {
            location.reload();
          }, 400);
        },
        (responseError) => {
          if (responseError.error.ValidationErrors?.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }
}
