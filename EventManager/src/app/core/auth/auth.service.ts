import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'customer';
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const storedUser = localStorage.getItem('eh_user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    // Mock login logic
    return new Observable(observer => {
      setTimeout(() => {
        let user: User;
        if (email === 'admin@eventhorizon.com') {
          user = { id: '1', name: 'John Doe', role: 'admin', token: 'mock-admin-token-123' };
        } else {
          user = { id: '2', name: 'Jane Smith', role: 'customer', token: 'mock-customer-token-456' };
        }

        localStorage.setItem('eh_user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        observer.next(user);
        observer.complete();
      }, 500);
    });
  }

  logout() {
    localStorage.removeItem('eh_user');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }
}
