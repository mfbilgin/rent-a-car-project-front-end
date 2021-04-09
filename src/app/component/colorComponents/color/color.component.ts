import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color/color';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor: Color;
  dataLoaded = false;
  filterText = '';
  authenticated: boolean;
  constructor(
    private colorService: ColorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated();
    this.getColor();
  }

  getColor() {
    this.colorService.getColor().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  getCurrentColorClass(color: Color) {
    if (this.currentColor == color) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllColorClass() {
    if (!this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  CleanCurrentColor() {
    this.currentColor = null;
  }
  isAuthenticated() {
    if (this.authService.isAuthehticated()) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }
}
