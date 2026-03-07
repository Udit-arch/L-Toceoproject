import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  venue: string;
  dates: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Declined';
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private mockBookings: Booking[] = [
    {
      id: 'b1',
      userId: '2',
      userName: 'Jane Smith',
      venue: 'Main Hall',
      dates: '2026-04-10 to 2026-04-12',
      description: 'Annual Tech Summit 2026',
      status: 'Pending',
      createdAt: new Date()
    },
    {
      id: 'b2',
      userId: 'some-other-id',
      userName: 'Alice Johnson',
      venue: 'Conference Room B',
      dates: '2026-03-25',
      description: 'Quarterly Board Meeting',
      status: 'Approved',
      createdAt: new Date(Date.now() - 86400000 * 2)
    }
  ];

  private bookingsSubject = new BehaviorSubject<Booking[]>([...this.mockBookings]);
  public bookings$ = this.bookingsSubject.asObservable();

  constructor() { }

  getAllBookings(): Observable<Booking[]> {
    return this.bookings$;
  }

  getUserBookings(userId: string): Observable<Booking[]> {
    return this.bookings$.pipe(
      map(bookings => bookings.filter(b => b.userId === userId))
    );
  }

  createBooking(bookingArgs: Omit<Booking, 'id' | 'status' | 'createdAt'>): void {
    const newBooking: Booking = {
      ...bookingArgs,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Pending',
      createdAt: new Date()
    };
    this.mockBookings = [newBooking, ...this.mockBookings];
    this.bookingsSubject.next([...this.mockBookings]);
  }

  updateBookingStatus(bookingId: string, newStatus: 'Approved' | 'Declined'): void {
    const index = this.mockBookings.findIndex(b => b.id === bookingId);
    if (index !== -1) {
      this.mockBookings[index] = { ...this.mockBookings[index], status: newStatus };
      this.bookingsSubject.next([...this.mockBookings]);
    }
  }
}
