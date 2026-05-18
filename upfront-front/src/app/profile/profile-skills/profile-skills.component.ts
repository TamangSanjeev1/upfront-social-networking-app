// profile-skills.component.ts
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {ProfileService} from "../../shared/services/profile.service";
import {Skill} from "../../shared/models/user-profile.model";

@Component({
  selector: 'app-profile-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  template: `
    <div class="skills-card">
      <div class="card-header">
        <h2 class="card-title">
          <mat-icon class="title-icon">code</mat-icon>
          Skills & Technologies
        </h2>
        <span class="skill-count">{{ ps.profile().skills.length }}</span>
      </div>

      <div class="skills-cloud">
        @for (skill of visibleSkills(); track skill.name) {
          <div
            class="skill-chip"
            [class]="'skill-chip--' + skill.level"
            [matTooltip]="skill.endorsements + ' endorsements · ' + skill.level"
          >
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-endorsements">
              <mat-icon class="endorse-icon">thumb_up</mat-icon>
              {{ skill.endorsements }}
            </span>
          </div>
        }
      </div>

      @if (ps.profile().skills.length > 8) {
        <button class="show-more-btn" (click)="toggleShowAll()">
            {{ showAll() ? 'Show fewer' : 'Show all ' + ps.profile().skills.length + ' skills' }}
          <mat-icon>{{ showAll() ? 'expand_less' : 'expand_more' }}</mat-icon>
        </button>
      }

      <div class="skill-legend">
        <span class="legend-item legend-item--expert">Expert</span>
        <span class="legend-item legend-item--intermediate">Intermediate</span>
        <span class="legend-item legend-item--beginner">Beginner</span>
      </div>
    </div>
  `,
  styles: [`
    .skills-card {
      background: var(--surface-card);
      border-radius: 16px;
      padding: 20px 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 18px;
    }

    .card-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
      flex: 1;
      font-family: var(--font-display);
      .title-icon { font-size: 20px; width: 20px; height: 20px; color: #6366f1; }
    }

    .skill-count {
      background: var(--surface-secondary);
      color: var(--text-muted);
      font-size: 12px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 100px;
    }

    .skills-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
    }

    .skill-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 500;
      cursor: default;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      border: 1.5px solid transparent;

      &:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

      --expert {
        background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12));
        color: #6366f1;
        border-color: rgba(99,102,241,0.3);
        .dark & { color: #a5b4fc; border-color: rgba(99,102,241,0.4); }
      }

      --intermediate {
        background: rgba(6,182,212,0.1);
        color: #0891b2;
        border-color: rgba(6,182,212,0.25);
        .dark & { color: #67e8f9; border-color: rgba(6,182,212,0.35); }
      }

      --beginner {
        background: rgba(16,185,129,0.1);
        color: #059669;
        border-color: rgba(16,185,129,0.25);
        .dark & { color: #6ee7b7; border-color: rgba(16,185,129,0.35); }
      }
    }

    .skill-name { font-weight: 600; }

    .skill-endorsements {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      font-size: 11px;
      opacity: 0.7;
      font-weight: 500;
    }

    .endorse-icon { font-size: 11px; width: 11px; height: 11px; }

    .show-more-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      color: #6366f1;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      padding: 4px 0;
      transition: opacity 0.15s;
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
      &:hover { opacity: 0.7; }
    }

    .skill-legend {
      display: flex;
      gap: 12px;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--border);
    }

    .legend-item {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 100px;

      --expert { color: #6366f1; background: rgba(99,102,241,0.1); }
      --intermediate { color: #0891b2; background: rgba(6,182,212,0.1); }
      --beginner { color: #059669; background: rgba(16,185,129,0.1); }
    }
  `],
})
export class ProfileSkillsComponent {
  protected ps = inject(ProfileService);
  protected showAll = signal(false);

  visibleSkills(): Skill[] {
    const skills = this.ps.profile().skills;
    return this.showAll() ? skills : skills.slice(0, 8);
  }

  toggleShowAll() {
    this.showAll.update(v => !v);
  }
}
