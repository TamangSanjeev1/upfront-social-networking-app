import {Component, computed, EventEmitter, Output} from '@angular/core';
import {NOTIFICATIONS} from '../../core/mock-data';
import {AuthService} from "../../core/services/auth.service";
import {WebSocketService} from "../../core/services/websocket.service";
import {BaseComponent} from "../../core/components/base.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent extends BaseComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() themeChanged = new EventEmitter<boolean>();
  
  isDark = false;
  notifOpen = false;
  notifications = [...NOTIFICATIONS];
  wsStatus = computed(() => this.ws.status());

  constructor(authService: AuthService, private ws: WebSocketService) {
    super(authService);
  }

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

  ngOnInit(): void {
    this.ws.connect();
  }

  ngOnDestroy(): void {
    this.ws.disconnect();
  }

  logout(): void { this.authService.logout(); }
}
