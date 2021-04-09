import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { Image } from 'src/app/models/image/image';
import { CarService } from 'src/app/services/car/car.service';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css'],
})
export class CarDeleteComponent implements OnInit {
  car: Car;
  images: Image[];
  imageId: number[];
  constructor(
    private carService: CarService,
    private imageService: ImageService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarById(params['carId']);
      }
    });
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
    });
  }

  getImageByCarId() {
    this.imageService.getImagesByCarId(this.car.carId).subscribe((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        this.toastrService.info(
          'Öncelikle aracın resimlerini silmelisiniz',
          'Dikkat'
        );
        this.router.navigate(['image/delete']);
        setTimeout(function () {
          location.reload();
        }, 1000);
      }
    });
  }

  delete() {
    this.carService.delete(this.car).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.router.navigate(['cars']);
      setTimeout(function () {
        location.reload();
      }, 1000);
    });
  }
}
