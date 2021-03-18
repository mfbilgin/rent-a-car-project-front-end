import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CartItem } from 'src/app/models/cartitem/cartItem';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  constructor(
    private cartService: CartService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartItems = this.cartService.listCart();
  }

  removeFromCart(car: Car) {
    this.cartService.removeFromCart(car);
    this.toastrService.warning('Sepetten Silindi', car.brandName);
  }
}
