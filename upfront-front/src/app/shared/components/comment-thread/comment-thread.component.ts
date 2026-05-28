import {Component, computed, inject, Input, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {finalize, Subject, takeUntil} from "rxjs";
import {CommentDto, CommentRequest} from "../../models/user-profile.model";
import {Apiconstants} from "../../apiconstants";
import {environment} from "../../../../environments/environment";
import {BaseComponent} from "../../../core/components/base.component";
import {Utils} from "../../utils/utils";

@Component({
  selector: 'app-comment-thread',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-thread.component.html',
  styleUrl: './comment-thread.component.scss'
})
export class CommentThreadComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input({ required: true }) postId!: number;
  @Input() currentUserId!: number;
  @Input() commentInput!: number;

  private http = inject(HttpClient);

  comments = signal<CommentDto[]>([]);
  newComment = signal('');
  isOpen = signal(false);
  isSubmitting = signal(false);
  deletingId = signal<number | null>(null);

  commentCount = computed(() => this.comments().length == 0 ? this.commentInput : this.comments().length);
  canSubmit = computed(() => this.newComment().trim().length > 0 && !this.isSubmitting());

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  togglePanel(): void {
    this.isOpen.update(v => !v);
    if (this.isOpen() && this.comments().length === 0) {
      this.loadComments();
    }
  }

  loadComments(): void {
    this.isLoading = true;
    this.error = null;

    this.http
        .get<CommentDto[]>(`${environment.apiUrl + Apiconstants.COMMENTS + '/' + this.postId}`)
        .pipe(
            takeUntil(this.destroy$),
            finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: data => this.comments.set(data),
          error: () => this.error = 'Failed to load comments.',
        });
  }

  submitComment(): void {
    const body = this.newComment().trim();
    if (!body || this.isSubmitting()) return;

    this.isSubmitting.set(true);

    const payload: CommentRequest = { body };

    this.http
        .post<CommentDto>(`${environment.apiUrl + Apiconstants.COMMENTS + '/' + this.postId}`, payload)
        .pipe(
            takeUntil(this.destroy$),
            finalize(() => this.isSubmitting.set(false))
        )
        .subscribe({
          next: comment => {
            this.comments.update(list => [comment, ...list]);
            this.newComment.set('');
          },
          error: () => this.error = 'Failed to post comment.',
        });
  }

  deleteComment(commentId: number): void {
    this.deletingId.set(commentId);

    this.http
        .delete(`${environment.apiUrl + Apiconstants.COMMENTS + '/' + this.postId}/comments/${commentId}`)
        .pipe(
            takeUntil(this.destroy$),
            finalize(() => this.deletingId.set(null))
        )
        .subscribe({
          next: () => this.comments.update(list => list.filter(c => c.id !== commentId)),
          error: () => this.error = 'Failed to delete comment.',
        });
  }

  onTextareaInput(event: Event): void {
    const el = event.target as HTMLTextAreaElement;
    this.newComment.set(el.value);
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }

  onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      this.submitComment();
    }
  }

  isOwnComment(comment: CommentDto): boolean {
    return comment.userId === this.currentUserId;
  }

  protected readonly Utils = Utils;
}