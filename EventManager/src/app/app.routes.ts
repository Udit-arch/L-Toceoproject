import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

// Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminEventsComponent } from './admin/events/admin-events/admin-events.component';

import { CustomerLayoutComponent } from './customer/customer-layout/customer-layout.component';
import { CalendarViewComponent } from './customer/calendar/calendar-view/calendar-view.component';
import { BookingFormComponent } from './customer/booking-form/booking-form/booking-form.component';
import { MyBookingsComponent } from './customer/my-bookings/my-bookings/my-bookings.component';

export const routes: Routes = [
    // Default redirect
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

    // Auth
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },

    // Admin Portal
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [roleGuard],
        data: { expectedRole: 'admin' },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'events', component: AdminEventsComponent }
        ]
    },

    // Customer Portal
    {
        path: 'customer',
        component: CustomerLayoutComponent,
        canActivate: [roleGuard],
        data: { expectedRole: 'customer' },
        children: [
            { path: '', redirectTo: 'portal/calendar', pathMatch: 'full' },
            { path: 'portal/calendar', component: CalendarViewComponent },
            { path: 'portal/book', component: BookingFormComponent },
            { path: 'portal/my-bookings', component: MyBookingsComponent }
        ]
    },

    // Fallback
    { path: '**', redirectTo: '/auth/login' }
];
