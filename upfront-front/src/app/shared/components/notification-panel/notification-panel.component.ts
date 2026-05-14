import { Component, Input, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { Subscription } from 'rxjs';
import { WebSocketService, Notification, WsStatus } from '../../../core/services/websocket.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-notification-panel',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatBadgeModule],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-4px)' }))
      ])
    ])
  ],
  template: `
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <mat-icon class="text-slate-600">notifications</mat-icon>
          <h2 class="font-semibold text-slate-800">Notifications</h2>
          @if (unreadCount() > 0) {
            <span class="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-blue-500 text-white text-xs font-medium">
              {{ unreadCount() }}
            </span>
          }
        </div>
        <div class="flex items-center gap-2">
          <!-- WS Status indicator -->
          <div class="flex items-center gap-1.5">
            <div [class]="statusDotClass()" class="w-2 h-2 rounded-full"></div>
            <span class="text-xs text-slate-400">{{ wsStatus() }}</span>
          </div>
          @if (notifications().length > 0) {
            <button mat-icon-button (click)="clearAll()" class="!w-8 !h-8" title="Clear all">
              <mat-icon class="!text-base text-slate-400">clear_all</mat-icon>
            </button>
          }
        </div>
      </div>

      <!-- Notification list -->
      <div class="max-h-80 overflow-y-auto divide-y divide-slate-50">
        @if (notifications().length === 0) {
          <div class="flex flex-col items-center justify-center py-12 text-slate-300">
            <mat-icon class="!text-4xl mb-2">inbox</mat-icon>
            <p class="text-sm">No notifications yet</p>
          </div>
        }
        @for (notif of notifications(); track notif.id) {
          <div [@slideIn] [class]="'flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors ' + rowBg(notif.type)">
            <mat-icon [class]="'!text-lg mt-0.5 ' + iconColor(notif.type)">{{ typeIcon(notif.type) }}</mat-icon>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-slate-700 leading-snug">{{ notif.message }}</p>
              <p class="text-xs text-slate-400 mt-0.5">{{ formatTime(notif.timestamp) }}</p>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class NotificationPanelComponent implements OnInit, OnDestroy {

  notifications = signal<Notification[]>([]);
  wsStatus = signal<WsStatus>('DISCONNECTED');
  unreadCount = computed(() => this.notifications().length);

  private sub = new Subscription();

  constructor(private ws: WebSocketService) {}

  ngOnInit(): void {
    this.sub.add(
      this.ws.notifications$.subscribe(n => {
        this.notifications.update(list => [n, ...list].slice(0, 50));
      })
    );
    // Sync WS status via effect-like polling
    const interval = setInterval(() => this.wsStatus.set(this.ws.status()), 1000);
    this.sub.add({ unsubscribe: () => clearInterval(interval) });
  }

  clearAll(): void { this.notifications.set([]); }

  statusDotClass(): string {
    const s = this.wsStatus();
    if (s === 'CONNECTED')   return 'bg-green-400 animate-pulse';
    if (s === 'CONNECTING')  return 'bg-yellow-400 animate-pulse';
    return 'bg-slate-300';
  }

  typeIcon(type: string): string {
    if (type === 'SUCCESS') return 'check_circle';
    if (type === 'WARNING') return 'warning';
    return 'info';
  }

  iconColor(type: string): string {
    if (type === 'SUCCESS') return 'text-green-500';
    if (type === 'WARNING') return 'text-amber-500';
    return 'text-blue-500';
  }

  rowBg(type: string): string {
    if (type === 'SUCCESS') return 'border-l-2 border-l-green-400';
    if (type === 'WARNING') return 'border-l-2 border-l-amber-400';
    return 'border-l-2 border-l-blue-400';
  }

  formatTime(ts: string): string {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }
}
