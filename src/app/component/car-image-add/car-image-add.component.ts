import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css'],
})
export class CarImageAddComponent implements OnInit {
  imageAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private imageService: ImageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createImageAddForm();
  }

  createImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      carId: ['', Validators.required],
      imagePath: ['', Validators.required],
    });
  }

  add() {
    if (this.imageAddForm.valid) {
      let imageModel = Object.assign({}, this.imageAddForm.value);
      this.imageService.add(imageModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success(response.message, 'Başarılı');
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
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }
}
