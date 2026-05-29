import {ChangeDetectionStrategy, Component, inject, OnInit, signal,} from '@angular/core';
import {formatDate} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ProfileService} from "../../shared/services/profile.service";
import {EditProfileDialogComponent} from '../edit-profile-dialog/edit-profile-dialog.component';
import {AuthService} from "../../core/services/auth.service";
import {Utils} from "../../shared/utils/utils";
import {UserProfileBaseComponent} from "../base-files/user-profile-base.component";
import {UserService} from "../../shared/services/services/user.service";

@Component({
  selector: 'app-profile-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent extends UserProfileBaseComponent implements OnInit {
  protected ps = inject(ProfileService);

  constructor(authService: AuthService) {
    super(authService);
  }

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
      data: { profile: this.user() },
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
    if (!n) return "0";
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toString();
  }

  protected readonly formatDate = formatDate;
  protected readonly Utils = Utils;
}
