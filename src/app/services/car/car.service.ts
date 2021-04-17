import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/car/carDetails';

import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = environment.apiUrl;

  add(car: CarDetail): Observable<SingleResponseModel<CarDetail>> {
    return this.httpClient.post<SingleResponseModel<CarDetail>>(
      this.apiUrl + 'cars/add',
      car
    );
  }
  update(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'cars/update',
      car
    );
  }

  delete(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'cars/delete',
      car
    );
  }

  getCar(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(
      this.apiUrl + 'cars/getall'
    );
  }

  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    return this.httpClient.get<SingleResponseModel<Car>>(
      this.apiUrl + 'Cars/getcarbyid?carId=' + carId
    );
  }
}
