import { Injectable, OnDestroy, signal } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import {TokenService} from "./token.service";
import {NotificationModel} from "../../shared/models/user-profile.model";

export interface Notification {
  id: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING';
  timestamp: string;
}

export type WsStatus = 'CONNECTING' | 'CONNECTED' | 'DISCONNECTED';

@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {

  status = signal<WsStatus>('DISCONNECTED');
  notifications$ = new Subject<NotificationModel>();

  private client: Client | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private authService: AuthService, private tokenService: TokenService) {}

  connect(): void {
    const token = this.tokenService.getToken();
    if (!token || this.client?.active) return;

    this.status.set('CONNECTING');

    this.client = new Client({
      webSocketFactory: () => new SockJS(environment.wsUrl),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,

      onConnect: () => {
        this.status.set('CONNECTED');
        this.subscribeToChannels();
        // Send ping to get immediate welcome notification
        this.client?.publish({ destination: '/app/ping' });
      },

      onDisconnect: () => {
        this.status.set('DISCONNECTED');
      },

      onStompError: (frame) => {
        console.error('STOMP error', frame);
        this.status.set('DISCONNECTED');
      }
    });

    this.client.activate();
  }

  private subscribeToChannels(): void {
    const userEmail = this.authService.currentUser()?.email;

    // Broadcast channel
    this.client?.subscribe('/topic/notifications', (msg: IMessage) => {
      this.notifications$.next(JSON.parse(msg.body));
    });

    // User-specific channel
    if (userEmail) {
      this.client?.subscribe('/user/notifications/' + userEmail, (msg: IMessage) => {
        this.notifications$.next(JSON.parse(msg.body));
      });
    }
  }

  disconnect(): void {
    this.client?.deactivate();
    this.client = null;
    this.status.set('DISCONNECTED');
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
