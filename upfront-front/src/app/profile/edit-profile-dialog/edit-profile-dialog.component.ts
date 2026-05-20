// edit-profile-dialog.component.ts
import {ChangeDetectionStrategy, Component, inject, OnInit, signal,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {UserProfile} from "../../core/models/common-model";
import {BaseService} from "../../shared/services/base-service/base.service";
import {BaseComponent} from "../../core/components/base.component";
import {AuthService} from "../../core/services/auth.service";
import {Apiconstants} from "../../shared/apiconstants";

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
export class EditProfileDialogComponent extends BaseComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EditProfileDialogComponent>);
  private snackBar = inject(MatSnackBar);
  private apiService = inject(BaseService);
  protected data: { profile: UserProfile } = inject(MAT_DIALOG_DATA);

  protected saving = signal(false);

  form!: FormGroup;

  constructor(authService: AuthService) {
    super(authService);
  }

  ngOnInit(): void {
    const p = this.data.profile;
    this.form = this.fb.group({
      name: [p.name, [Validators.required, Validators.minLength(2)]],
      email: [p.email, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i) ]],
      title: [p.title ? p.title : ""],
      bio: [p.bio ? p.bio : "", [Validators.maxLength(500)]],
      location: [p.location ? p.location : ""],
      company: [p.company ? p.company : ""],
      github: [p.socialLinks ? p.socialLinks.github : ""],
      linkedin: [p.socialLinks ? p.socialLinks.linkedin : ""],
      twitter: [p.socialLinks ? p.socialLinks.twitter : ""],
      portfolio: [p.socialLinks ? p.socialLinks.portfolio : ""],
      website: [p.socialLinks ? p.socialLinks.website : ""],
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
      this.apiService.postRequest({
        name: v.name,
        email: v.email,
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
      },Apiconstants.USER).subscribe({
        next: user => {
          this.authService.updateUserDetails()
          this.saving.set(false);
          this.dialogRef.close();
          this.snackBar.open('Profile updated successfully!', '✕', {
            duration: 3500,
            panelClass: ['snack-success'],
          });
        },
        error: () => {
          this.saving.set(false);
          this.snackBar.open('Profile update fail!', '✕', {
            duration: 3500,
            panelClass: ['snack-fail'],
          });
        }
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
