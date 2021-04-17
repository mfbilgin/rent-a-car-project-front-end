import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetail } from 'src/app/models/customer/customerDetial';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = environment.apiUrl;

  getCustomer(): Observable<ListResponseModel<CustomerDetail>> {
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(
      this.apiUrl + 'customers/getcustomerdetail'
    );
  }

  getCustomerByUserId(
    userId: number
  ): Observable<SingleResponseModel<Customer>> {
    return this.httpClient.get<SingleResponseModel<Customer>>(
      this.apiUrl + 'customers/getbyuserid?userId=' + userId
    );
  }
  getCustomerByCustomerId(
    customerId: number
  ): Observable<SingleResponseModel<Customer>> {
    return this.httpClient.get<SingleResponseModel<Customer>>(
      this.apiUrl + 'customers/getbycustomerid?customerID=' + customerId
    );
  }

  add(customer: Customer): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'customers/add',
      customer
    );
  }

  update(customer: Customer): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'customers/update',
      customer
    );
  }
}
