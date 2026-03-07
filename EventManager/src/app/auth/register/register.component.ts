import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2 style="text-align:center">Registration Mock</h2>
        <p style="text-align:center; color: var(--text-secondary)">
          Registration is currently mocked. Please return to login and use the provided demo accounts.
        </p>
        <button class="submit-btn" style="width: 100%; margin-top:20px" onclick="window.location.href='/auth/login'">Return to Login</button>
      </div>
    </div>
  `,
  styleUrl: '../login/login.component.css'
})
export class RegisterComponent { }
