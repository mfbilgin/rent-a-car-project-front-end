import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarService } from 'src/app/services/car/car.service';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css'],
})
export class ImageAddComponent implements OnInit {
  cars: Car[];
  imageAddForm: FormGroup;
  imageFiles: File[];
  savedCarId: number;
  constructor(
    private imageService: ImageService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCarImageAddForm();
    this.getCars();
  }
  getCars() {
    this.carService.getCar().subscribe((response) => {
      this.cars = response.data;
    });
  }
  createCarImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      carId: [this.savedCarId],
      file: ['', Validators.required],
    });
  }

  uploadFile(event: any) {
    this.imageFiles = event.target.files;
  }

  addImage() {
    this.savedCarId = this.imageAddForm.value.carId;
    if (this.imageAddForm.valid) {
      for (let i = 0; i < this.imageFiles.length; i++) {
        this.imageService.add(this.savedCarId, this.imageFiles[i]).subscribe(
          (response) => {
            this.toastrService.success('Resim Eklendi', 'Başarılı');
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
}
