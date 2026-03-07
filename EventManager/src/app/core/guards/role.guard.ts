import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'];
  const user = authService.currentUserValue;

  if (!authService.isLoggedIn() || !user) {
    return router.createUrlTree(['/auth/login']);
  }

  if (user.role !== expectedRole) {
    // Redirect based on actual role if they try to access the wrong area
    if (user.role === 'admin') {
      return router.createUrlTree(['/admin/dashboard']);
    } else {
      return router.createUrlTree(['/customer/portal']);
    }
  }

  return true;
};
