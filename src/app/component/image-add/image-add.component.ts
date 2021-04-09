import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css'],
})
export class ImageAddComponent implements OnInit {
  imageAddForm: FormGroup;
  imageFiles: File[];
  savedCarId: number;
  constructor(
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createCarImageAddForm();
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
