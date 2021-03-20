import { Component, OnInit } from '@angular/core';
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
  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getRental();
  }

  getRental() {
    this.rentalService.getRental().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }
}
