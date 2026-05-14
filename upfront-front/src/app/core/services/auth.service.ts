import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  createdAt: string;
  lastLogin: string;
}

const TOKEN_KEY = 'jwt_token';

@Injectable({ providedIn: 'root' })
export class AuthService {

  currentUser = signal<UserProfile | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    // Restore user from token on init
    if (this.isAuthenticated()) {
      this.fetchCurrentUser().subscribe({
        next: user => this.currentUser.set(user),
        error: () => this.logout()
      });
    }
  }

  loginWithGoogle(): void {
    window.location.href = environment.googleAuthUrl;
  }

  handleCallback(token: string): void {
    this.saveToken(token);
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
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
