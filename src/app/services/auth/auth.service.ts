import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/auth/login';
import { Register } from 'src/app/models/auth/register';
import { Token } from 'src/app/models/auth/token';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { ForgotPassword } from 'src/app/models/user/forgotPassword';
import { UserDetail } from 'src/app/models/user/userDetail';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  login(loginModel: Login) {
    return this.httpClient.post<SingleResponseModel<Token>>(
      this.apiUrl + 'auth/login',
      loginModel
    );
  }
  register(registerModel: Register) {
    return this.httpClient.post<SingleResponseModel<Token>>(
      this.apiUrl + 'auth/register',
      registerModel
    );
  }

  changePassword(userDetail: UserDetail): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'auth/changepassword',
      userDetail
    );
  }
  forgotPassword(forgotPassword: ForgotPassword): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'auth/forgotpassword',
      forgotPassword
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
