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
  carId: number;
  images: Image[];
  imageId: number[];
  dataLoaded = false;
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
        this.carId = Number(params['carId']);
        this.getCarById(this.carId);
        this.getImageByCarId();
      }
    });
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
      this.dataLoaded = true;
    });
  }

  getImageByCarId() {
    this.imageService.getImagesByCarId(this.carId).subscribe((response) => {
      this.images = response.data;
      this.dataLoaded = true;
    });
  }

  deleteImageandCar() {
    this.imageService.getImagesByCarId(this.carId).subscribe((response) => {
      this.images = response.data;
      this.images?.forEach((image) => {
        this.imageService.delete(Number(image.id)).subscribe((response) => {
          this.toastrService.success('Resim Silindi', 'Başarılı');
          this.delete();
        });
      });
    });
  }

  delete() {
    this.carService.delete(this.car).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.router.navigate(['cars']);
      setTimeout(function () {
        location.reload();
      }, 600);
    });
  }
}
