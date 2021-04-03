import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/auth/login';
import { Register } from 'src/app/models/auth/register';
import { Token } from 'src/app/models/auth/token';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { UserDetail } from 'src/app/models/user/userDetail';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44380/api/auth/';
  constructor(private httpClient: HttpClient) {}

  login(loginModel: Login) {
    return this.httpClient.post<SingleResponseModel<Token>>(
      this.apiUrl + 'login',
      loginModel
    );
  }
  register(registerModel: Register) {
    return this.httpClient.post<SingleResponseModel<Token>>(
      this.apiUrl + 'register',
      registerModel
    );
  }

  changePassword(userDetail: UserDetail): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'changepassword',
      userDetail
    );
  }
  isAuthehticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
