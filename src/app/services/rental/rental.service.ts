import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = environment.apiUrl;

  getRental(): Observable<ListResponseModel<RentalDetail>> {
    return this.httpClient.get<ListResponseModel<RentalDetail>>(
      this.apiUrl + 'rentals/getdetail'
    );
  }
  getRentalById(id: number): Observable<SingleResponseModel<Rental>> {
    return this.httpClient.get<SingleResponseModel<Rental>>(
      this.apiUrl + 'rentals/getbyrentalid?rentalId=' + id
    );
  }
  deleteRental(rental: Rental) {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'rentals/delete',
      rental
    );
  }
}
