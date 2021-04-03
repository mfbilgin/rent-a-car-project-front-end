import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card/card';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental/rental';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SavedCardService {
  constructor(private httpClient: HttpClient) {}

  saveCard(card: Card): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'saveCard/add',
      card
    );
  }

  getCardByUserId(userId: number): Observable<ListResponseModel<Card>> {
    return this.httpClient.get<ListResponseModel<Card>>(
      environment.apiUrl + 'saveCard/getbyuserid?userId=' + userId
    );
  }
  getCardByCardNumber(
    cardNumber: string
  ): Observable<SingleResponseModel<Card>> {
    return this.httpClient.get<SingleResponseModel<Card>>(
      environment.apiUrl + 'saveCard/getbycardnumber?cardNumber=' + cardNumber
    );
  }

  checkCardExist(cardNumber: string): Observable<ListResponseModel<Card>> {
    return this.httpClient.get<ListResponseModel<Card>>(
      environment.apiUrl + 'saveCard/getbycardnumber?cardNumber=' + cardNumber
    );
  }
}
