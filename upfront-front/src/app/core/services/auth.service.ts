import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {TokenService} from "./token.service";
import {UserProfile} from "../models/common-model";

@Injectable({ providedIn: 'root' })
export class AuthService {

  currentUser = signal<UserProfile | null>(null);

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) {
  }

  initializeAuth(): void {
    if (!this.isAuthenticated() || this.currentUser()) {
      return;
    }

    this.fetchCurrentUser().subscribe({
      next: user => this.currentUser.set(user),
      error: () => console.log()
    });
  }

  loginWithGoogle(): void {
    window.location.href = environment.googleAuthUrl;
  }

  handleCallback(token: string): void {
    this.tokenService.setToken(token);
    this.fetchCurrentUser().subscribe({
      next: user => {
        this.currentUser.set(user);
        this.router.navigate(['/dashboard']);
      },
      error: () => this.logout()
    });
  }

  fetchCurrentUser() {
    return this.http.get<UserProfile>(`${environment.apiUrl}/api/user/me`);
  }

  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  logout(): void {
    this.tokenService.clear();
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
