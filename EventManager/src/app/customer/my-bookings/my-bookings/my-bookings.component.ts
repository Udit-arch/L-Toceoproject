import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, Booking } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {
  myBookings$: Observable<Booking[]> = of([]);

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const user = this.authService.currentUserValue;
    if (user) {
      this.myBookings$ = this.bookingService.getUserBookings(user.id);
    }
  }
}
