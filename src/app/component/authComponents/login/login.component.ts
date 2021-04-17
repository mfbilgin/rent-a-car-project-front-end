import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserOperationClaim } from 'src/app/models/user/userOperationClaim';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userId: number;
  customerId: number;
  claim: UserOperationClaim;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  setIds(email: string) {
    if (this.loginForm.valid) {
      this.userService.getUserByMail(email).subscribe((response) => {
        this.userId = response.data.userId;
      });
    }
  }

  getClaim() {
    this.userService.getUserClaims(this.userId).subscribe((response) => {
      if (response.data.length > 0) {
        this.router.navigate(['cars']);
        setTimeout(function () {
          location.reload();
        }, 600);
      } else {
        this.addUserClaim();
      }
    });
  }

  addUserClaim() {
    this.claim = {
      userId: this.userId,
      operationClaimId: 9,
    };
    this.userService.addUserOperationClaim(this.claim).subscribe((res) => {});
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.setIds(loginModel.email);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.getClaim();
          this.toastrService.success('Giriş Başarılı', 'Başarılı');
          this.localStorageService.add('email', loginModel.email);
          this.localStorageService.add('token', response.data.token);
          this.router.navigate(['profile']);
          setTimeout(function () {
            location.reload();
          });
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    } else {
      this.toastrService.error(environment.formInvalid, 'Dikkat');
    }
  }
}
