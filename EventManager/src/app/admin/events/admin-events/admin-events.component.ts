import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, Booking } from '../../../core/services/booking.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-events.component.html',
  styleUrl: './admin-events.component.css'
})
export class AdminEventsComponent implements OnInit {
  bookings$!: Observable<Booking[]>;
  selectedBooking: Booking | null = null;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookings$ = this.bookingService.getAllBookings();
  }

  selectBooking(booking: Booking) {
    this.selectedBooking = booking;
  }

  closeDetail() {
    this.selectedBooking = null;
  }

  approveBooking(booking: Booking) {
    this.bookingService.updateBookingStatus(booking.id, 'Approved');
    if (this.selectedBooking?.id === booking.id) {
      this.selectedBooking = { ...booking, status: 'Approved' };
    }
  }

  declineBooking(booking: Booking) {
    this.bookingService.updateBookingStatus(booking.id, 'Declined');
    if (this.selectedBooking?.id === booking.id) {
      this.selectedBooking = { ...booking, status: 'Declined' };
    }
  }
}
