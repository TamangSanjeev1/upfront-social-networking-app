// edit-profile-dialog.component.ts
import {
  Component, inject, signal, OnInit, ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {ProfileService} from "../../shared/services/profile.service";
import {UserProfile} from "../../core/models/common-model";

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatDialogModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatSnackBarModule,
    MatTabsModule, MatProgressSpinnerModule,
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss'],
})
export class EditProfileDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EditProfileDialogComponent>);
  private snackBar = inject(MatSnackBar);
  private ps = inject(ProfileService);
  protected data: { profile: UserProfile } = inject(MAT_DIALOG_DATA);

  protected saving = signal(false);

  form!: FormGroup;

  ngOnInit(): void {
    const p = this.data.profile;
    this.form = this.fb.group({
      displayName: [p.name, [Validators.required, Validators.minLength(2)]],
      username: [p.username, [Validators.required, Validators.pattern(/^[a-z0-9._]+$/)]],
      title: [p.title],
      bio: [p.bio, [Validators.maxLength(500)]],
      location: [p.location],
      company: [p.company],
      github: [p.socialLinks.github],
      linkedin: [p.socialLinks.linkedin],
      twitter: [p.socialLinks.twitter],
      portfolio: [p.socialLinks.portfolio],
      website: [p.socialLinks.website],
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const v = this.form.value;

    setTimeout(() => {
      this.ps.updateProfile({
        displayName: v.displayName,
        username: v.username,
        title: v.title,
        bio: v.bio,
        location: v.location,
        company: v.company,
        socialLinks: {
          github: v.github,
          linkedin: v.linkedin,
          twitter: v.twitter,
          portfolio: v.portfolio,
          website: v.website,
        },
      });

      this.saving.set(false);
      this.dialogRef.close();
      this.snackBar.open('Profile updated successfully!', '✕', {
        duration: 3500,
        panelClass: ['snack-success'],
      });
    }, 1200);
  }

  close(): void {
    this.dialogRef.close();
  }

  get bioLength(): number {
    return this.form.get('bio')?.value?.length ?? 0;
  }

  hasError(field: string, error: string): boolean {
    const c = this.form.get(field);
    return !!(c?.hasError(error) && c.touched);
  }
}
