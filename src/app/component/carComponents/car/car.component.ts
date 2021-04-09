import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { CarDetails } from 'src/app/models/car/carDetails';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarDetailService } from 'src/app/services/car-detail/car-detail.service';
import { ColorService } from 'src/app/services/color/color.service';
import { ImageService } from 'src/app/services/image/image.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetails[];
  brands: Brand[];
  colors: Color[];
  dataLoaded = false;
  currentColorId: number;
  currentBrandId: number;
  filterText = '';
  baseUrl = environment.baseUrl;
  imageDefaultPath: string = this.baseUrl + '/images/default.jpg';
  carId: number;
  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private brandService: BrandService,
    private localStorageService: LocalStorageService,
    private carImageService: ImageService
  ) {}

  ngOnInit(): void {
    this.cleanLocalStorage();
    this.getBrand();
    this.getColor();
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColorId(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carDetailService.getCar().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrandId(brandId: number) {
    this.carDetailService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColorId(colorId: number) {
    this.carDetailService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getColor() {
    this.colorService.getColor().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
  getBrand() {
    this.brandService.getBrand().subscribe((respone) => {
      this.brands = respone.data;
      this.dataLoaded = true;
    });
  }
  getCurrentBrandId(brand: Brand) {
    if (brand.brandId == this.currentBrandId) {
      return true;
    } else {
      return false;
    }
  }
  getCurrentColorId(color: Color) {
    if (color.colorId == this.currentColorId) {
      return true;
    } else {
      return false;
    }
  }
  cleanCurrentColor() {
    if (this.currentColorId) {
      return true;
    } else {
      return false;
    }
  }

  cleanCurrentBrand() {
    if (this.currentBrandId) {
      return true;
    } else {
      return false;
    }
  }
  setRouterLink() {
    if (this.currentBrandId) {
      return '/cars/brand/' + this.currentBrandId;
    } else if (this.currentColorId) {
      return '/cars/color/' + this.currentColorId;
    } else {
      return '/cars';
    }
  }
  cleanLocalStorage() {
    this.localStorageService.remove('passwordHash');
    this.localStorageService.remove('passwordSalt');
    this.localStorageService.remove('companyName');
  }
}
