import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { OperationClaim } from 'src/app/models/user/operationClaim';
import { User } from 'src/app/models/user/user';
import { UserOperationClaim } from 'src/app/models/user/userOperationClaim';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getAllUser() {
    return this.httpClient.get<ListResponseModel<User>>(
      this.apiUrl + 'users/getall'
    );
  }
  getUserByMail(email: string) {
    return this.httpClient.get<SingleResponseModel<User>>(
      this.apiUrl + 'users/getbyemail?email=' + email
    );
  }
  getUserByUserId(userId: number): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(
      this.apiUrl + 'users/getbyuserid?userId=' + userId
    );
  }

  update(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'users/update',
      user
    );
  }
  addFindexPoint(userId: number): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'users/addfindexpoint',
      userId
    );
  }

  getUserClaims(userId: number): Observable<ListResponseModel<OperationClaim>> {
    return this.httpClient.get<ListResponseModel<OperationClaim>>(
      this.apiUrl + 'users/getclaims?userId=' + userId
    );
  }

  addUserOperationClaim(claim: UserOperationClaim) {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'userOperationClaims/add',
      claim
    );
  }
}
