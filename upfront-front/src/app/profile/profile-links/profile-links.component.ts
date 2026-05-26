// profile-links.component.ts
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ProfileService} from "../../shared/services/profile.service";
import {BaseComponent} from "../../core/components/base.component";
import {AuthService} from "../../core/services/auth.service";
import {UserService} from "../../shared/services/services/user.service";
import {UserProfileBaseComponent} from "../base-files/user-profile-base.component";

interface LinkConfig {
  key: keyof import('../../shared/models/user-profile.model').SocialLinks;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

@Component({
  selector: 'app-profile-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="links-card">
      <div class="card-header">
        <h2 class="card-title">
          <mat-icon class="title-icon">link</mat-icon>
          Links
        </h2>
      </div>
      <ul class="links-list">
        @for (link of visibleLinks(); track link.key) {
          <li class="link-item">
            <a
              [href]="user()!.socialLinks[link.key]"
              target="_blank"
              rel="noopener noreferrer"
              class="link-anchor"
              [matTooltip]="link.label"
            >
              <span class="link-icon-wrapper" [style.background]="link.bgColor">
                <img [src]="getIconSvg(link.key)" [alt]="link.label" class="link-svg-icon" onerror="this.style.display='none'" />
                <mat-icon *ngIf="link.key === 'website'" [style.color]="link.color">language</mat-icon>
              </span>
              <span class="link-info">
                <span class="link-label">{{ link.label }}</span>
                <span class="link-url">{{ viewUserInfo ? formatUrl(viewUserInfo.socialLinks[link.key]!) : formatUrl(user()!.socialLinks[link.key]!) }}</span>
              </span>
              <mat-icon class="link-ext">open_in_new</mat-icon>
            </a>
          </li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .links-card {
      background: var(--surface-card);
      border-radius: 16px;
      padding: 20px 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }

    .card-header { margin-bottom: 14px; }

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

    .links-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .link-anchor {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 12px;
      text-decoration: none;
      transition: background 0.15s ease, transform 0.15s ease;
      color: inherit;

      &:hover {
        background: var(--surface-hover);
        transform: translateX(2px);

        .link-ext { opacity: 1; transform: translateY(-1px); }
      }
    }

    .link-icon-wrapper {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      mat-icon { font-size: 18px; width: 18px; height: 18px; }
    }

    .link-svg-icon {
      width: 18px;
      height: 18px;
    }

    .link-info {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .link-label {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.3;
    }

    .link-url {
      font-size: 12px;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .link-ext {
      font-size: 14px;
      width: 14px;
      height: 14px;
      color: var(--text-muted);
      opacity: 0;
      transition: all 0.15s ease;
      flex-shrink: 0;
    }
  `],
})
export class ProfileLinksComponent extends UserProfileBaseComponent {

  constructor(authService: AuthService, userService: UserService) {
    super(authService, userService);
  }

  readonly linkConfigs: LinkConfig[] = [
    { key: 'github', label: 'GitHub', icon: 'github', color: '#fff', bgColor: '#24292e' },
    { key: 'linkedin', label: 'LinkedIn', icon: 'linkedin', color: '#fff', bgColor: '#0a66c2' },
    { key: 'twitter', label: 'Twitter / X', icon: 'twitter', color: '#fff', bgColor: '#000' },
    { key: 'portfolio', label: 'Portfolio', icon: 'portfolio', color: '#6366f1', bgColor: 'rgba(99,102,241,0.12)' },
    { key: 'website', label: 'Website / Blog', icon: 'language', color: '#10b981', bgColor: 'rgba(16,185,129,0.12)' },
  ];

  visibleLinks() {
    if (!this.viewUserInfo && !this.user()!.socialLinks) {
      return;
    }
    const links = this.viewUserInfo && this.viewUserInfo.socialLinks ? this.viewUserInfo.socialLinks : this.user()!.socialLinks;
    return links ? this.linkConfigs.filter(c => links[c.key]) : [];
  }

  getIconSvg(key: string): string {
    const icons: Record<string, string> = {
      github: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z'/%3E%3C/svg%3E`,
      linkedin: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/%3E%3C/svg%3E`,
      twitter: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'/%3E%3C/svg%3E`,
      portfolio: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%236366f1' d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E`,
    };
    return icons[key] || '';
  }

  formatUrl(url: string): string {
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  }
}
