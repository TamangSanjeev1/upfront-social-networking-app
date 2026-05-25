// profile-bio.component.ts
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {BaseComponent} from "../../core/components/base.component";
import {AuthService} from "../../core/services/auth.service";
import {UserProfileBaseComponent} from "../base-files/user-profile-base.component";
import {UserService} from "../../shared/services/services/user.service";

@Component({
  selector: 'app-profile-bio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bio-card">
      <div class="card-header">
        <h2 class="card-title">
          <mat-icon class="title-icon">person_outline</mat-icon>
          About
        </h2>
      </div>
      <div class="bio-body">
        <p class="bio-text" [class.collapsed]="!expanded()">
          {{ user()!.bio ? user()!.bio : "No bio yet" }}
        </p>
        @if (isTruncatable()) {
          <button class="expand-btn" (click)="toggleExpanded()">
            {{ expanded() ? 'Show less' : 'Show more' }}
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .bio-card {
      background: var(--surface-card);
      border-radius: 16px;
      padding: 20px 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }

    .card-header {
      margin-bottom: 14px;
    }

    .card-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
      font-family: var(--font-display);

      .title-icon { font-size: 20px; width: 20px; height: 20px; color: #6366f1; }
    }

    .bio-text {
      font-size: 14.5px;
      line-height: 1.75;
      color: var(--text-secondary);
      margin: 0;
      white-space: pre-line;
      overflow: hidden;
      transition: max-height 0.3s ease;

      &.collapsed {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    .expand-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      color: #6366f1;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      padding: 6px 0 0;
      transition: opacity 0.15s;

      mat-icon { font-size: 16px; width: 16px; height: 16px; }
      &:hover { opacity: 0.7; }
    }
  `],
})
export class ProfileBioComponent extends UserProfileBaseComponent {
  protected expanded = signal(false);

  constructor(authService: AuthService, userService: UserService) {
    super(authService, userService);
  }

  isTruncatable(): boolean {
    return this.user()!.bio ? this.user()!.bio.length > 200 : false;
  }

  toggleExpanded() {
    this.expanded.update(v => !v);
  }}
