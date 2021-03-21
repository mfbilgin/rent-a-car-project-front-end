import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { CarDetails } from 'src/app/models/car/carDetails';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarDetailService } from 'src/app/services/car-detail/car-detail.service';
import { ColorService } from 'src/app/services/color/color.service';
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
  filterText = '';

  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
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
      console.log('Getirildi');
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
}
