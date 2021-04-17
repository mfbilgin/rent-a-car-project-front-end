import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarService } from 'src/app/services/car/car.service';
import { ImageService } from 'src/app/services/image/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css'],
})
export class ImageAddComponent implements OnInit {
  cars: Car[];
  imageAddForm: FormGroup;
  imageFiles: File[];
  carId: number;
  dataLoaded = false;
  constructor(
    private imageService: ImageService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = Number(params['carId']);
        console.log(this.carId);
      }
    });
    this.createCarImageAddForm();
    this.getCars();
  }
  getCars() {
    this.carService.getCar().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  createCarImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      carId: ['', Validators.nullValidator],
      file: ['', Validators.required],
    });
  }

  uploadFile(event: any) {
    this.imageFiles = event.target.files;
  }

  addImage() {
    if (this.imageAddForm.valid) {
      let imageModel = Object.assign({}, this.imageAddForm.value);
      if (this.carId != null) {
        this.imageAddById(this.carId);
      } else if (this.carId == null) {
        this.imageAddById(imageModel.carId);
      }
    } else {
      this.toastrService.error(environment.formInvalid, 'Hata');
    }
  }

  imageAddById(carId: number) {
    for (let i = 0; i < this.imageFiles.length; i++) {
      this.imageService.add(carId, this.imageFiles[i]).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['cars']);
          setTimeout(function () {
            location.reload();
          }, 600);
        },
        (responseError) => {
          console.log(responseError);
          this.toastrService.error(responseError.error.message, 'Hata');
        }
      );
    }
  }
}
