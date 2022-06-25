import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BrandService } from 'src/app/services/brand/brand.service';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand;
  dataLoaded = false;
  filterText = '';
  authenticated: boolean;

  constructor(
    private brandService: BrandService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated();
    this.getBrand();
  }

  getBrand() {
    this.brandService.getBrand().subscribe((respone) => {
      this.brands = respone.data;
      this.dataLoaded = true;
    });
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand: Brand) {
    if (this.currentBrand == brand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllBrandClass() {
    if (!this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  CleanCurrentBrand() {
    this.currentBrand = null;
  }
  isAuthenticated() {
    if (this.authService.isAuthehticated()) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }
}
