import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPassword } from 'src/app/models/user/forgotPassword';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createChangePassForm();
  }

  createChangePassForm() {
    this.changePasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      let passwordModel: ForgotPassword = Object.assign(
        {},
        this.changePasswordForm.value
      );
      this.authService.forgotPassword(passwordModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.router.navigate(['login']);
          setTimeout(function () {
            location.reload();
          }, 400);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata');
        }
      );
    } else {
      this.toastrService.error(environment.formInvalid, 'Hata');
    }
  }
}
