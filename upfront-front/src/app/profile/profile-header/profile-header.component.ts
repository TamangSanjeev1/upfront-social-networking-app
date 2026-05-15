import {
  Component, inject, signal, OnInit, ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import {ProfileService} from "../../shared/services/profile.service";
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, MatChipsModule],
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
  protected ps = inject(ProfileService);
  private dialog = inject(MatDialog);

  protected avatarLoaded = signal(false);
  protected coverLoaded = signal(false);

  ngOnInit(): void {
    // Simulate cover image load
    setTimeout(() => this.coverLoaded.set(true), 600);
  }

  openEditDialog(): void {
    this.dialog.open(EditProfileDialogComponent, {
      width: '640px',
      maxWidth: '96vw',
      panelClass: 'edit-profile-panel',
      data: { profile: this.ps.profile() },
    });
  }

  get coverGradient(): string {
    const covers = [
      'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      'linear-gradient(135deg, #0d1117 0%, #161b22 60%, #1c2128 100%)',
    ];
    return covers[0];
  }

  formatNumber(n: number): string {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toString();
  }
}
