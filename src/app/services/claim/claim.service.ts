import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { OperationClaim } from 'src/app/models/user/operationClaim';
import { UserOperationClaim } from 'src/app/models/user/userOperationClaim';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClaimService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = environment.apiUrl;
  getClaim() {
    return this.httpClient.get<ListResponseModel<OperationClaim>>(
      this.apiUrl + 'operations/getall'
    );
  }

  add(claim: UserOperationClaim) {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'UserOperationClaims/update',
      claim
    );
  }
}
