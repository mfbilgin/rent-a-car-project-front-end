import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailAndImagesDto } from 'src/app/models/car/carAndImagesDto';
import { CarDetail } from 'src/app/models/car/carDetails';

import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getCarDetailByCarId(carId: number) {
    let newPath =
      environment.apiUrl + 'cars/getcardetailbycarid?carId=' + carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }
  getCar(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getcardetail';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByColorAndBrand(
    colorId: number,
    brandId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath =
      this.apiUrl +
      'cars/getcardetailbybrandandcolorid?colorId=' +
      colorId +
      '&brandId=' +
      brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
