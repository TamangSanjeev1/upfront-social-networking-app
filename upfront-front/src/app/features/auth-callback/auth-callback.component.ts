import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-4">
      <mat-spinner diameter="40" color="primary"></mat-spinner>
      <p class="text-slate-400 text-sm">Completing sign-in...</p>
    </div>
  `
})
export class AuthCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.auth.handleCallback(token);
    } else {
      this.auth.logout();
    }
  }
}
