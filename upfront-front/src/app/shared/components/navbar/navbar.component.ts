import {Component, computed, EventEmitter, OnDestroy, OnInit, Output, signal} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {WebSocketService} from "../../../core/services/websocket.service";
import {BaseComponent} from "../../../core/components/base.component";
import {CommonModule} from "@angular/common";
import {NotificationModel} from "../../models/user-profile.model";
import {Subscription} from "rxjs";
import {PaginationService} from "../../services/services/pagination.service";
import {Apiconstants} from "../../apiconstants";
import console from "node:console";
import {MatDialog} from "@angular/material/dialog";
import {ViewNotificationComponent} from "../../../dashboard/view-notification/view-notification.component";
import {Utils} from "../../utils/utils";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() themeChanged = new EventEmitter<boolean>();
  
  isDark = false;
  notifOpen = false;
  profileOpen = false;
  notifications = signal<NotificationModel[]>([]);
  wsStatus = computed(() => this.ws.status());
  private sub = new Subscription();

  constructor(authService: AuthService, private ws: WebSocketService, private notificationService: PaginationService, private dialog: MatDialog) {
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
    this.notificationService.getById(Apiconstants.READ, n.id).subscribe({
      next: (response)=> {
        n.unread = false;
      },
      error:(err) => {
        console.log(err);
      }
    });
  }

  viewAllNotifications() {
    this.dialog.open(ViewNotificationComponent, {
      height: '900px',
      width: '1200px',
      data: {
        id: ''
      }
    });
  }

  markAllRead() {
    this.notifications()!.forEach(n => n.unread = false);
  }

  ngOnInit(): void {
    this.ws.connect();
    this.subscribeNotification();
    this.fetchNotifications();
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
    super.destroy();
  }

  logout(): void { this.authService.logout(); }

  fetchNotifications() {
    this.notificationService.getByPagination(this.page, this.size, Apiconstants.NOTIFICATION).subscribe({
      next: (response) => {
        this.notifications.update(list =>
            [...response.content, ...list].slice(0, 50)
        );
      },
      error: (err) => {
        this.error = 'Failed to load posts!';
        console.error(err);
      }
    });
  }

  protected readonly Utils = Utils;
}
