import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {
  bookingForm: FormGroup;
  currentStep = 1;

  venues = ['Main Hall', 'Conference Room A', 'Conference Room B', 'Outdoor Pavilion'];

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      venue: ['', Validators.required],
      dates: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  nextStep() {
    if (this.currentStep === 1 && this.bookingForm.get('venue')?.valid) this.currentStep++;
    else if (this.currentStep === 2 && this.bookingForm.get('dates')?.valid) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  submitBooking() {
    if (this.bookingForm.invalid) return;

    const user = this.authService.currentUserValue;
    if (!user) return;

    this.bookingService.createBooking({
      userId: user.id,
      userName: user.name,
      ...this.bookingForm.value
    });

    this.router.navigate(['/customer/portal/my-bookings']);
  }
}
