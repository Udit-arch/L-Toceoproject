import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="customer-layout">
      <header class="top-nav">
        <div class="brand">
          <div class="logo">EH</div>
          <h1>EVENT HORIZON</h1>
        </div>
        <nav class="nav-links">
          <a routerLink="/customer/portal/calendar" routerLinkActive="active">Availability</a>
          <a routerLink="/customer/portal/book" routerLinkActive="active">Book Venue</a>
          <a routerLink="/customer/portal/my-bookings" routerLinkActive="active">My Requests</a>
        </nav>
        <div class="user-actions">
          <span class="user-name">Welcome, {{ authService.currentUserValue?.name }}</span>
          <button class="logout-btn" (click)="authService.logout()">Logout</button>
        </div>
      </header>
      <main class="customer-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {
  constructor(public authService: AuthService) { }
}
