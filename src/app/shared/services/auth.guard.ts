import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginSignupService } from './login-signup.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginSignupService = inject(LoginSignupService);

  if (typeof window !== 'undefined') {
    const role = sessionStorage.getItem('role');

    if (!role) {
      return true; // Allow access if no role exists
    }

    if (role === 'admin' && state.url.startsWith('/admin')) {
      return true; // Allow admin access
    }

    if (role === 'seller' && state.url.startsWith('/seller')) {
      return true; // Allow seller access
    }

    if (role === 'buyer' && state.url.startsWith('/buyer')) {
      return true; // Allow buyer access
    }

    // Redirect to relevant dashboard based on role
    if (role === 'admin') {
      router.navigate(['/admin-dashboard']);
    } else if (role === 'seller') {
      router.navigate(['/seller-dashboard']);
    } else if (role === 'buyer') {
      router.navigate(['/buyer-dashboard']);
    }
  }
  
  return false; // Block access if role doesn't match the route
};
