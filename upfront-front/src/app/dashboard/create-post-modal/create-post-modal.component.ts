import {Component, EventEmitter, inject, Input, OnInit, Output, signal} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/models/user-profile.model";
import {BaseService} from "../../shared/services/base-service/base.service";
import {Apiconstants} from "../../shared/apiconstants";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RefreshService} from "../../shared/services/services/refresh-service";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrl: './create-post-modal.component.scss'
})
export class CreatePostModalComponent implements OnInit {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  private snackBar = inject(MatSnackBar);
  private refreshService = inject(RefreshService);
  private authService = inject(AuthService);
  postForm!: FormGroup;
  submitted = false;
  post: Partial<Post> = {};
  protected saving = signal(false);

  availableTags = [
    'Culture', 'Career Growth', 'Work-Life Balance', 'Compensation',
    'Management', 'Benefits', 'Remote Work', 'Diversity & Inclusion',
    'Tech Stack', 'Interview Process', 'Layoffs', 'Leadership'
  ];

  sentimentOptions: { value: string; label: string; icon: string }[] = [
    { value: 'positive', label: 'Positive', icon: '↑' },
    { value: 'mixed',    label: 'Mixed',    icon: '~' },
    { value: 'negative', label: 'Negative', icon: '↓' },
  ];

  ratingHover = 0;

  postType = 'post';

  constructor(private fb: FormBuilder, private apiService: BaseService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const d = this.post;
    this.postForm = this.fb.group({
      type:     [d.type ? d.type : this.postType,     [Validators.required, Validators.maxLength(30)]],
      company:      [d.company, [Validators.max(40)]],
      role:         [d.role,         Validators.required, Validators.max(30)],
      title:        [d.title,        [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      body:         [d.body,         [Validators.required, Validators.minLength(10)]],
      tags:         [d.tags,         [Validators.required]],
      rating:       [d.rating,       [Validators.required, Validators.min(0), Validators.max(5)]],
      salary:       [d.salary],
      sentiment:    [d.sentiment,    Validators.required],
      isVerified:   [d.isVerified],
      isUpvoted:    [d.isUpvoted],
    });
  }

  setRating(value: number): void {
    this.postForm.get('rating')?.setValue(value);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.postForm.controls;
  }
  setPostType(type: string) {
    this.postType = type;
    this.postForm.get('type')?.setValue(type);
  }

  get selectedTags(): string[] {
    return this.postForm.get('tags')?.value ?? [];
  }

  toggleTag(tag: string): void {
    const control = this.postForm.get('tags');
    const current: string[] = control?.value ?? [];
    const updated = current.includes(tag)
        ? current.filter(t => t !== tag)
        : [...current, tag];
    control?.setValue(updated);
    control?.markAsDirty();
  }

  starsArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  get currentRating(): number {
    return this.postForm.get('rating')?.value ?? 0;
  }

  submitForm() {
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    }

    this.saving.set(true);
    this.apiService.postRequest(this.postForm.value, Apiconstants.POST).subscribe({
      next: () => {
        this.saving.set(false);
        this.submitted = false;
        this.postForm.reset();
        this.close.emit();
        this.refreshService.triggerRefresh();
        this.authService.updateUserDetails();
        this.setPostType("post");
        this.snackBar.open('Posted successfully!', '✕', {
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

  }
}
