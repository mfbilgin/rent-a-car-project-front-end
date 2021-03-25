import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarDetailAndImagesDto } from 'src/app/models/car/carAndImagesDto';
import { CarDetailService } from 'src/app/services/car-detail/car-detail.service';
import { CarService } from 'src/app/services/car/car.service';
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
    private activatedRoute: ActivatedRoute
  ) {}

  carDetail: CarDetailAndImagesDto;
  dataLoaded = false;
  imageBasePath = environment.baseUrl;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
      }
    });
  }

  getCarDetail(carId: number) {
    this.carDetailService.getCarDetail(carId).subscribe((response) => {
      this.carDetail = response.data;

      this.dataLoaded = true;
    });
  }
  getSliderClassName(index: number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }
}
