import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">

      <!-- Background grid pattern -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%234f6bff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div class="relative z-10 w-full max-w-md">
        <!-- Card -->
        <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

          <!-- Logo / Brand -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/30 mb-4">
              <mat-icon class="text-blue-400 !text-3xl">bolt</mat-icon>
            </div>
            <h1 class="text-2xl font-semibold text-white tracking-tight">Welcome back</h1>
            <p class="text-slate-400 mt-1 text-sm">Sign in to continue to your dashboard</p>
          </div>

          <!-- Divider -->
          <div class="flex items-center gap-3 mb-6">
            <div class="flex-1 h-px bg-white/10"></div>
            <span class="text-slate-500 text-xs uppercase tracking-widest">Continue with</span>
            <div class="flex-1 h-px bg-white/10"></div>
          </div>

          <!-- Google Button -->
          <button
            (click)="loginWithGoogle()"
            class="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-800 font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]">
            <!-- Google SVG icon -->
            <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>

          <!-- Footer note -->
          <p class="text-center text-slate-500 text-xs mt-6">
            By signing in you agree to our terms of service
          </p>
        </div>

        <!-- Bottom brand mark -->
        <p class="text-center text-slate-600 text-xs mt-6">
          Secured with JWT &bull; OAuth2
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  constructor(private auth: AuthService) {}
  loginWithGoogle(): void { this.auth.loginWithGoogle(); }
}
