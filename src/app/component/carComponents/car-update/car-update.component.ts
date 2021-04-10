import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';
@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  car: Car;
  colors: Color[];
  brands: Brand[];
  carUpdateForm: FormGroup;

  carId: number;
  brandId: number = 0;
  colorId: number = 0;
  modelYear: number = 0;
  dailyPrice: number = 0;
  descript: string = 'a';
  brandName: string = 'b';
  minFindex: number = 0;
  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = Number(params['carId']);
        this.getCarById(params['carId']);
      }
    });
  }
  getBrands() {
    this.brandService.getBrand().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    this.colorService.getColor().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
      this.setDefaultCarValue();
    });
  }

  setDefaultCarValue() {
    this.brandId = this.car.brandId;
    this.colorId = this.car.colorId;
    this.modelYear = this.car.modelYear;
    this.dailyPrice = this.car.dailyPrice;
    this.descript = this.car.descript;
    this.brandName = this.car.brandName;
    this.minFindex = this.car.minFindex;
    this.CreateCarUpdateForm();
  }
  CreateCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      brandId: [this.brandId, Validators.required],
      colorId: [this.colorId, Validators.required],
      modelYear: [this.modelYear, Validators.required],
      dailyPrice: [this.dailyPrice, Validators.required],
      descript: [this.descript, Validators.required],
      brandName: [this.brandName, Validators.required],
      minFindex: [this.minFindex, Validators.required],
    });
  }

  update() {
    let carModel = Object.assign({}, this.carUpdateForm.value);
    console.log(carModel);
    this.carService.update(carModel).subscribe(
      (response) => {
        console.log(response);
        this.toastrService.success(response.message, 'Başarılı');
        this.router.navigate(['cars']);
        setTimeout(function () {
          location.reload();
        }, 1000);
      },
      (responseError) => {
        if (responseError.error.ValidationErrors.length > 0) {
          for (
            let i = 0;
            i < responseError.error.ValidationErrors.length;
            i++
          ) {
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,
              'Doğrulama Hatası'
            );
          }
        }
      }
    );
  }
}
