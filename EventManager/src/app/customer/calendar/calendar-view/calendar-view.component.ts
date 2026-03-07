import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BookingService, Booking } from '../../../core/services/booking.service';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule],
  template: `
    <div class="calendar-container">
      <div class="header-section">
        <h2>Venue Availability</h2>
        <p>Check the calendar below to see days processing existing requests.</p>
        <div class="legend">
          <span class="legend-item"><div class="dot booked"></div> Unavailable (Booked)</span>
          <span class="legend-item"><div class="dot pending"></div> Pending Request</span>
        </div>
      </div>

      <div class="calendar-wrapper">
        <mat-card class="demo-inline-calendar-card">
          <mat-calendar [dateClass]="dateClass()"></mat-calendar>
        </mat-card>
      </div>
    </div>
  `,
  styleUrl: './calendar-view.component.css'
})
export class CalendarViewComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getAllBookings().subscribe(b => {
      this.bookings = b;
    });
  }

  // Very simplified mockup logic for date styling
  dateClass() {
    return (date: Date): 'booked-date' | 'pending-date' | '' => {
      // In a real app we would parse 'date' and match against booking.dates
      // Mocking specific highlight behavior for visual flair based on day:
      const day = date.getDate();

      // Pseudo random scattering mock
      if (day === 10 || day === 15 || day === 22) return 'booked-date';
      if (day === 5 || day === 11 || day === 28) return 'pending-date';

      return '';
    };
  }
}
