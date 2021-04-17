import { Binary } from '@angular/compiler';
import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/user/operationClaim';
import { User } from 'src/app/models/user/user';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  reloaded = false;
  claims: OperationClaim[];
  updateUserForm: FormGroup;
  user: User;
  dataLoaded = false;
  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reload();
    this.createUserForm();
    this.getUserInfo();
    this.getClaims();
  }
  getClaims() {
    this.userService
      .getUserClaims(Number(this.localStorageService.get('userId')))
      .subscribe((response) => {
        console.log(response);
        this.claims = response.data;
      });
  }

  getUserInfo() {
    this.userService
      .getUserByMail(this.localStorageService.get('email'))
      .subscribe((response) => {
        this.user = response.data;
        this.dataLoaded = true;
        this.localStorageService.add('firstName', this.user.firstName);
        this.localStorageService.add('lastName', this.user.lastName);
        this.localStorageService.add('passwordHash', this.user.passwordHash);
        this.localStorageService.add('passwordSalt', this.user.passwordSalt);
        this.localStorageService.add('userId', this.user.userId);
        this.localStorageService.add('findexpoint', this.user.findexPoint);
      });
  }

  createUserForm() {
    this.updateUserForm = this.formBuilder.group({
      userId: [
        this.localStorageService.get('userId'),
        Validators.nullValidator,
      ],
      firstName: [
        this.localStorageService.get('firstName'),
        Validators.nullValidator,
      ],
      lastName: [
        this.localStorageService.get('lastName'),
        Validators.nullValidator,
      ],
      email: [this.localStorageService.get('email'), Validators.email],
      passwordHash: [
        this.localStorageService.get('passwordHash'),
        Validators.nullValidator,
      ],
      passwordSalt: [
        this.localStorageService.get('passwordSalt'),
        Validators.nullValidator,
      ],
      status: [true, Validators.nullValidator],
      findexPoint: [
        this.localStorageService.get('findexpoint'),
        Validators.nullValidator,
      ],
    });
  }

  update() {
    if (this.updateUserForm.valid) {
      let userModel = Object.assign({}, this.updateUserForm.value);
      console.log(userModel);
      userModel.findexPoint = Number(userModel.findexPoint);
      userModel.userId = Number(userModel.userId);
      this.userService.update(userModel).subscribe((response) => {
        this.toastrService.info(response.message, 'Başarılı');
        setTimeout(function () {
          location.reload();
        }, 600);
        setTimeout(function () {
          location.reload();
        });
      });
    } else {
      this.toastrService.error('Tüm Alanları Doldurunuz', 'Dikkat');
    }
  }

  reload() {
    if (this.reloaded == true) {
      setTimeout(function () {
        location.reload();
      });
      setTimeout(function () {
        location.reload();
      });
      setTimeout(function () {
        location.reload();
      });
      this.reloaded = true;
    }
  }
}
