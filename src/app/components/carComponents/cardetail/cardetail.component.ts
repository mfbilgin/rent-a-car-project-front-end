import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailAndImagesDto } from 'src/app/models/car/carAndImagesDto';
import { CarDetail } from 'src/app/models/car/carDetails';
import { OperationClaim } from 'src/app/models/user/operationClaim';
import { User } from 'src/app/models/user/user';
import { CarDetailService } from 'src/app/services/car-detail/car-detail.service';
import { CarService } from 'src/app/services/car/car.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  constructor(
    private carDetailService: CarDetailService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  car: CarDetail;
  images: string[];
  imageBasePath = environment.baseUrl;
  defaultImg = this.imageBasePath + 'images/default.jpg';
  user: User;
  claims: OperationClaim[];
  dataLoaded = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarByCarId(params['carId']);
        this.getUserById();
        this.getClaims();
      }
    });
  }
  getCarByCarId(carId: number) {
    this.carDetailService.getCarDetailByCarId(carId).subscribe((response) => {
      this.car = response.data;
      this.images = this.car.imagePath;
      this.dataLoaded = response.success;
    });
  }
  getClaims() {
    this.userService
      .getUserClaims(Number(this.localStorageService.get('userId')))
      .subscribe((response) => {
        this.claims = response.data;
      });
  }

  getUserById() {
    this.userService
      .getUserByUserId(Number(this.localStorageService.get('userId')))
      .subscribe((response) => {
        this.user = response.data;
      });
  }
  getSliderClass(index: number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  setSliderButtonClass(index: number) {
    return index.toString();
  }
}
