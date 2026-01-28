import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../models';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss',
})
export class ShoppingCartComponent {
  cartItems$: Observable<CartItem[]>;
  displayedColumns: string[] = ['imageUrl', 'name', 'price', 'quantity', 'total', 'actions'];

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.items$;
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item.id);
  }

  getTotal(): number {
    return this.cartService.getTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
