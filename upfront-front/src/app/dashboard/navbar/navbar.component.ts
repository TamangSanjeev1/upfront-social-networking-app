import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NOTIFICATIONS } from '../../core/mock-data';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() themeChanged = new EventEmitter<boolean>();
  
  wsConnected = true;
  isDark = false;
  notifOpen = false;
  notifications = [...NOTIFICATIONS];

  get unreadCount() {
    return this.notifications.filter(n => n.unread).length;
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    this.themeChanged.emit(this.isDark);
  }

  toggleNotifications() {
    this.notifOpen = !this.notifOpen;
  }

  readNotif(n: any) {
    n.unread = false;
  }

  markAllRead() {
    this.notifications.forEach(n => n.unread = false);
  }
}
