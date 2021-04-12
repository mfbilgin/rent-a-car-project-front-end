import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { Image } from 'src/app/models/image/image';
import { CarService } from 'src/app/services/car/car.service';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-image-delete',
  templateUrl: './image-delete.component.html',
  styleUrls: ['./image-delete.component.css'],
})
export class ImageDeleteComponent implements OnInit {
  getCarIdForm: FormGroup;
  images: Image[];
  cars: Car[];

  dataLoaded = false;
  constructor(
    private imageService: ImageService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCars();
    this.createCarIdForm();
  }

  getAllCars() {
    this.carService.getCar().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  createCarIdForm() {
    this.getCarIdForm = this.formBuilder.group({
      carId: ['', Validators.required],
    });
  }

  getImageByCarId() {
    if (this.getCarIdForm.valid) {
      let model = Object.assign({}, this.getCarIdForm.value);
      this.imageService.getImagesByCarId(model.carId).subscribe((response) => {
        this.images = response.data;
        this.images?.forEach((image) => {
          this.imageService.delete(Number(image.id)).subscribe((response) => {
            this.toastrService.success('Resim Silindi', 'Başarılı');
            this.router.navigate(['cars']);
            setTimeout(function () {
              location.reload();
            }, 600);
          });
        });
      });
    } else {
      this.toastrService.error('Formu Doldurmalısınız', 'Dikkat');
    }
  }
}
