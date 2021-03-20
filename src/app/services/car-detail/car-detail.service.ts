import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDetailAndImagesDto } from 'src/app/models/car/carAndImagesDto';
import { ItemResponseModel } from 'src/app/models/itemResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  constructor(private httpClient: HttpClient) {}

  getCarDetail(carId: number) {
    let newPath = environment.apiUrl + 'cars/getcardetailbyId?carId=' + carId;
    return this.httpClient.get<ItemResponseModel<CarDetailAndImagesDto>>(
      newPath
    );
  }
}
