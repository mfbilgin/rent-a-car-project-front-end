import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: RentalDetail[];
  dataLoaded = false;
  message = '';
  rental: Rental;
  constructor(
    private rentalService: RentalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRental();
  }

  getRental() {
    this.rentalService.getRental().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }

  deleteRental(rentalId: number) {
    this.rentalService.getRentalById(rentalId).subscribe((response) => {
      this.rental = response.data;
      this.rentalService.deleteRental(this.rental).subscribe((response) => {
        this.toastr.success('Silindi');
        setTimeout(function () {
          location.reload();
        }, 200);
      });
    });
  }
}
