// profile-activity-tabs.component.ts
import {
  Component, inject, signal, computed, ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import {ProfileService} from "../../shared/services/profile.service";
import {ActivityPost} from "../../shared/models/user-profile.model";

type TabType = 'post' | 'comment' | 'review' | 'saved';

interface Tab {
  type: TabType | 'all';
  label: string;
  icon: string;
}

@Component({
  selector: 'app-profile-activity-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatTabsModule, MatIconModule, MatChipsModule, MatButtonModule],
  templateUrl: './profile-activity-tabs.component.html',
  styleUrls: ['./profile-activity-tabs.component.scss'],
})
export class ProfileActivityTabsComponent {
  protected ps = inject(ProfileService);
  protected activeTab = signal<TabType | 'all'>('all');

  readonly tabs: Tab[] = [
    { type: 'all', label: 'All', icon: 'view_list' },
    { type: 'post', label: 'Posts', icon: 'article' },
    { type: 'comment', label: 'Comments', icon: 'chat_bubble_outline' },
    { type: 'review', label: 'Reviews', icon: 'rate_review' },
    { type: 'saved', label: 'Saved', icon: 'bookmark_border' },
  ];

  readonly filteredActivity = computed<ActivityPost[]>(() => {
    const tab = this.activeTab();
    const all = this.ps.profile().activity;
    return tab === 'all' ? all : all.filter(a => a.type === tab);
  });

  tabCount(type: TabType | 'all'): number {
    const all = this.ps.profile().activity;
    return type === 'all' ? all.length : all.filter(a => a.type === type).length;
  }

  typeConfig(type: string): { color: string; bg: string; icon: string; label: string } {
    const configs: Record<string, { color: string; bg: string; icon: string; label: string }> = {
      post:    { color: '#6366f1', bg: 'rgba(99,102,241,0.1)',  icon: 'article',           label: 'Post'    },
      comment: { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)',   icon: 'chat_bubble_outline', label: 'Comment' },
      review:  { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  icon: 'rate_review',       label: 'Review'  },
      saved:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  icon: 'bookmark_border',   label: 'Saved'   },
    };
    return configs[type] || configs['post'];
  }

  formatUpvotes(n: number): string {
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();
  }
}
