import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/models/image/image';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  apiUrl = 'https://localhost:44380/api/';
  constructor(private httpClient: HttpClient) {}

  getImagesByCarId(carId: number): Observable<ListResponseModel<Image>> {
    let newPath = this.apiUrl + 'carimages/getimagesbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Image>>(newPath);
  }

  getImagesByBrandId(brandId: number): Observable<ListResponseModel<Image>> {
    let newPath = this.apiUrl + 'carimages//' + brandId;
    return this.httpClient.get<ListResponseModel<Image>>(newPath);
  }

  getAll(): Observable<ListResponseModel<Image>> {
    let newPath = this.apiUrl + 'carimages/getall';
    return this.httpClient.get<ListResponseModel<Image>>(newPath);
  }
  add(image: Image): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'images/add',
      image
    );
  }
}
