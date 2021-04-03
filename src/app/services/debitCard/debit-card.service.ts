import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DebitCard } from 'src/app/models/card/debitCard';
import { Rental } from 'src/app/models/rental/rental';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DebitCardService {
  constructor(private httpClient: HttpClient) {}

  getCardByCardNumber(
    cardNumber: string
  ): Observable<SingleResponseModel<DebitCard>> {
    return this.httpClient.get<SingleResponseModel<DebitCard>>(
      environment.apiUrl + 'debitCards/getbycardnumber?cardNumber=' + cardNumber
    );
  }
  pay(
    cardNumber: string,
    rental: Rental,
    amount: Number
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'debitcards/addrental',
      {
        cardNumber: cardNumber,
        rental: rental,
        amount: amount,
      }
    );
  }
}
