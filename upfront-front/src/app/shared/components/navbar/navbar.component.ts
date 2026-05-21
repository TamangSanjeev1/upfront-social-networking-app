import {Component, computed, EventEmitter, Output, signal} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {WebSocketService} from "../../../core/services/websocket.service";
import {BaseComponent} from "../../../core/components/base.component";
import {CommonModule} from "@angular/common";
import {NotificationModel} from "../../models/user-profile.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent extends BaseComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() themeChanged = new EventEmitter<boolean>();
  
  isDark = false;
  notifOpen = false;
  profileOpen = false;
  notifications = signal<NotificationModel[]>([]);
  wsStatus = computed(() => this.ws.status());
  private sub = new Subscription();

  constructor(authService: AuthService, private ws: WebSocketService) {
    super(authService);
  }

  get unreadCount() {
    return this.notifications()!.filter(n => n.unread).length;
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
    if (this.notifOpen) this.profileOpen = false;
  }

  toggleProfile() {
    this.profileOpen = !this.profileOpen;
    if (this.profileOpen) this.notifOpen = false;
  }

  readNotif(n: any) {
    n.unread = false;
  }

  markAllRead() {
    this.notifications()!.forEach(n => n.unread = false);
  }

  ngOnInit(): void {
    this.ws.connect();
    this.subscribeNotification();
  }

  subscribeNotification() {
    this.sub.add(
        this.ws.notifications$.subscribe(n => {
          this.notifications.update(list => [n, ...list].slice(0, 50));
        })
    );
  }

  ngOnDestroy(): void {
    this.ws.disconnect();
    this.sub.unsubscribe();
  }

  logout(): void { this.authService.logout(); }
}
