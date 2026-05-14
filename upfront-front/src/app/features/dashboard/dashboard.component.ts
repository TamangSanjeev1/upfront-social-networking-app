import { Component, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../core/services/auth.service';
import { WebSocketService } from '../../core/services/websocket.service';
import { NotificationPanelComponent } from '../../shared/components/notification-panel/notification-panel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, NotificationPanelComponent],
  template: `
    <div class="min-h-screen bg-slate-50">

      <!-- Top nav -->
      <header class="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <mat-icon class="text-blue-600">bolt</mat-icon>
            <span class="font-semibold text-slate-800">AppName</span>
          </div>
          <div class="flex items-center gap-3">
            @if (user()) {
              <span class="text-sm text-slate-500 hidden sm:block">{{ user()!.email }}</span>
              <img
                [src]="user()!.profileImage || 'https://ui-avatars.com/api/?name=' + user()!.name"
                [alt]="user()!.name"
                class="w-8 h-8 rounded-full border-2 border-slate-200 object-cover">
            }
            <button mat-icon-button (click)="logout()" matTooltip="Logout">
              <mat-icon class="text-slate-500">logout</mat-icon>
            </button>
          </div>
        </div>
      </header>

      <!-- Main content -->
      <main class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- Left column: Profile card + stats -->
          <div class="lg:col-span-1 space-y-5">

            <!-- Profile card -->
            @if (user()) {
              <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
                <div class="relative inline-block mb-4">
                  <img
                    [src]="user()!.profileImage || 'https://ui-avatars.com/api/?name=' + user()!.name + '&size=120'"
                    [alt]="user()!.name"
                    class="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover mx-auto">
                  <span class="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
                </div>
                <h2 class="text-lg font-semibold text-slate-800">{{ user()!.name }}</h2>
                <p class="text-sm text-slate-400 mt-0.5">{{ user()!.email }}</p>

                <div class="mt-5 pt-4 border-t border-slate-50 space-y-2 text-left">
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-400">Member since</span>
                    <span class="text-slate-600 font-medium">{{ formatDate(user()!.createdAt) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-400">Last login</span>
                    <span class="text-slate-600 font-medium">{{ formatDate(user()!.lastLogin) }}</span>
                  </div>
                </div>
              </div>
            }

            <!-- WS status card -->
            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <mat-icon class="text-slate-400 !text-lg">cable</mat-icon>
                  <span class="text-sm font-medium text-slate-700">WebSocket</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <div [class]="wsDotClass()" class="w-2.5 h-2.5 rounded-full"></div>
                  <span class="text-xs font-medium" [class]="wsTextClass()">{{ wsStatus() }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right column: Notifications -->
          <div class="lg:col-span-2">
            <app-notification-panel />
          </div>
        </div>
      </main>
    </div>
  `
})
export class DashboardComponent implements OnInit, OnDestroy {

  user = computed(() => this.auth.currentUser());
  wsStatus = computed(() => this.ws.status());

  constructor(
    private auth: AuthService,
    private ws: WebSocketService
  ) {}

  ngOnInit(): void {
    this.ws.connect();
  }

  ngOnDestroy(): void {
    this.ws.disconnect();
  }

  logout(): void { this.auth.logout(); }

  wsDotClass(): string {
    const s = this.wsStatus();
    if (s === 'CONNECTED')  return 'bg-green-400 animate-pulse';
    if (s === 'CONNECTING') return 'bg-yellow-400 animate-pulse';
    return 'bg-slate-300';
  }

  wsTextClass(): string {
    const s = this.wsStatus();
    if (s === 'CONNECTED')  return 'text-green-600';
    if (s === 'CONNECTING') return 'text-yellow-600';
    return 'text-slate-400';
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
