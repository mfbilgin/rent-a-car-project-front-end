import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44380/api/';
  constructor(private httpClient: HttpClient) {}

  getUserByMail(email: string) {
    return this.httpClient.get<ListResponseModel<User>>(
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
    console.log(userId);
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'users/addfindexpoint',
      userId
    );
  }
}
