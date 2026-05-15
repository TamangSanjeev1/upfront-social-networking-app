// profile-stats.component.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {ProfileService} from "../../shared/services/profile.service";

interface StatItem {
  label: string;
  icon: string;
  color: string;
  gradient: string;
  key: string;
}

@Component({
  selector: 'app-profile-stats',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="stats-card">
      <div class="card-header">
        <h2 class="card-title">
          <mat-icon class="title-icon">bar_chart</mat-icon>
          Activity Stats
        </h2>
      </div>
      <div class="stats-grid">
        @for (stat of statItems; track stat.key) {
          <div class="stat-item" [style.--accent]="stat.color" [style.--gradient]="stat.gradient">
            <div class="stat-icon-wrapper">
              <mat-icon class="stat-icon">{{ stat.icon }}</mat-icon>
            </div>
            <div class="stat-body">
              <span class="stat-value">{{ formatNum(getStatValue(stat.key)) }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
            <div class="stat-bar">
              <div class="stat-bar-fill" [style.width.%]="getBarPercent(stat.key)"></div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .stats-card {
      background: var(--surface-card);
      border-radius: 16px;
      padding: 20px 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }

    .card-header { margin-bottom: 18px; }

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

    .stats-grid {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
      transition: background 0.15s;

      &:hover { background: var(--surface-hover); }
    }

    .stat-icon-wrapper {
      width: 34px;
      height: 34px;
      border-radius: 9px;
      background: var(--gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .stat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: var(--accent);
    }

    .stat-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .stat-value {
      font-size: 17px;
      font-weight: 800;
      color: var(--text-primary);
      font-family: var(--font-display);
      line-height: 1;
    }

    .stat-label {
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 400;
    }

    .stat-bar {
      width: 60px;
      height: 4px;
      background: var(--surface-secondary);
      border-radius: 100px;
      overflow: hidden;
      flex-shrink: 0;
    }

    .stat-bar-fill {
      height: 100%;
      background: var(--accent);
      border-radius: 100px;
      transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
  `],
})
export class ProfileStatsComponent {
  protected ps = inject(ProfileService);

  readonly statItems: StatItem[] = [
    { key: 'posts', label: 'Posts', icon: 'article', color: '#6366f1', gradient: 'rgba(99,102,241,0.1)' },
    { key: 'comments', label: 'Comments', icon: 'chat_bubble_outline', color: '#06b6d4', gradient: 'rgba(6,182,212,0.1)' },
    { key: 'reviews', label: 'Code Reviews', icon: 'rate_review', color: '#10b981', gradient: 'rgba(16,185,129,0.1)' },
    { key: 'saved', label: 'Saved', icon: 'bookmark_border', color: '#f59e0b', gradient: 'rgba(245,158,11,0.1)' },
    { key: 'solutions', label: 'Solutions', icon: 'check_circle_outline', color: '#8b5cf6', gradient: 'rgba(139,92,246,0.1)' },
    { key: 'upvotes', label: 'Upvotes Received', icon: 'thumb_up_alt', color: '#ef4444', gradient: 'rgba(239,68,68,0.1)' },
  ];

  getStatValue(key: string): number {
    const s = (this.ps.profile()?.stats ?? {}) as unknown as Record<string, number>;
    return s[key] ?? 0;
  }

  getBarPercent(key: string): number {
    const max: Record<string, number> = {
      posts: 1000, comments: 5000, reviews: 200, saved: 1000, solutions: 200, upvotes: 50000,
    };
    return Math.min(100, (this.getStatValue(key) / (max[key] || 100)) * 100);
  }

  formatNum(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toString();
  }
}
