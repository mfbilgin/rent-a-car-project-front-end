import { Injectable } from '@angular/core';
import { Car } from 'src/app/models/car/car';
import { CartItem } from 'src/app/models/cartitem/cartItem';
import { CartItems } from 'src/app/models/cartitem/cartItems';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(car: Car) {
    let item = CartItems.find((c) => c.car.carId === car.carId);

    if (item) {
      item.quantity += 1;
    } else {
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
    }
  }

  removeFromCart(car: Car) {
    let item: CartItem = CartItems.find((c) => c.car.carId === car.carId);
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      CartItems.splice(CartItems.indexOf(item), 1);
    }
  }

  listCart(): CartItem[] {
    return CartItems;
  }
}
