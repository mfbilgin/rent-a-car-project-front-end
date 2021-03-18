import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { Image } from 'src/app/models/image/image';
import { CarService } from 'src/app/services/car/car.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  cars: Car[] = [];
  images: Image[] = [];
  ImagePaths: string[] = [];
  imageUrl = 'https://localhost:44380/';
  defaultImageUrl = 'https://localhost:44380/';
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private ImageService: ImageService,
    private toastrService: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarsById(params['carId']);
        this.getImagesById(params['carId']);
      }
    });
  }

  getCarsById(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarByBrandId(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarByColorId(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getImagesById(carId: number) {
    this.ImageService.getImagesByCarId(carId).subscribe((response) => {
      this.images = response.data;
      this.dataLoaded = true;
    });
  }
  addToCart(car: Car) {
    this.toastrService.success('Sepete Eklendi', car.descript);
    this.cartService.addToCart(car);
    console.log('/cars');
  }

  clicked() {}
}
