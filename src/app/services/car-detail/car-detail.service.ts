import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailAndImagesDto } from 'src/app/models/car/carAndImagesDto';
import { CarDetails } from 'src/app/models/car/carDetails';
import { ItemResponseModel } from 'src/app/models/itemResponseModel';

import { ListResponseModel } from 'src/app/models/listResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  apiUrl = 'https://localhost:44380/api/';
  constructor(private httpClient: HttpClient) {}

  getCarDetail(carId: number) {
    let newPath = environment.apiUrl + 'cars/getcardetailbyId?carId=' + carId;
    return this.httpClient.get<ItemResponseModel<CarDetailAndImagesDto>>(
      newPath
    );
  }
  getCar(): Observable<ListResponseModel<CarDetails>> {
    let newPath = this.apiUrl + 'cars/getcardetail';
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetails>> {
    let newPath = this.apiUrl + 'cars/getbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetails>> {
    let newPath = this.apiUrl + 'cars/getbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  getCarDetailByCarId(
    carId: number
  ): Observable<ListResponseModel<CarDetails>> {
    let newPath = this.apiUrl + 'cars/getcardetailbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
}
