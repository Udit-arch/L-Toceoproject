import { Component, Inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe
  ],
  template: `
    <mat-toolbar color="primary" class="navbar retro-navbar">
      <span routerLink="/" class="logo">OCEO</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">Home</button>
      <button mat-button routerLink="/about" routerLinkActive="active-link">About</button>
      <button mat-button routerLink="/admin" routerLinkActive="active-link">Admin</button>
      <button mat-icon-button routerLink="/cart">
        <mat-icon [matBadge]="cartCount$ | async" matBadgeColor="warn">shopping_cart</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: `
    .retro-navbar {
      background-color: #000 !important;
      border-bottom: 2px solid #00ffff;
      box-shadow: 0 0 10px #00ffff;
    }
    .logo {
      font-family: 'VT323', monospace;
      font-size: 2rem;
      color: #ff004c;
      text-shadow: 2px 2px #00ffff;
      cursor: pointer;
      margin-right: 20px;
      letter-spacing: 2px;
    }
    button {
      font-family: 'VT323', monospace;
      font-size: 1.2rem;
      color: #00ffff;
    }
    .active-link {
      color: #ff004c !important;
      text-decoration: underline;
    }
    .spacer {
      flex: 1 1 auto;
    }
  `
})
export class NavbarComponent implements OnInit {
  cartCount$: any;

  constructor(private cartService: CartService) {
    this.cartCount$ = this.cartService.items$.pipe(
      map(items => items.reduce((acc, item) => acc + item.quantity, 0))
    );
  }

  ngOnInit(): void { }
}
