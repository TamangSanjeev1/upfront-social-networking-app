import {Component, Input, signal} from '@angular/core';
import {Utils} from "../../shared/utils/utils";
import {Router} from "@angular/router";
import {BaseComponent} from "../../core/components/base.component";
import {AuthService} from "../../core/services/auth.service";
import {PaginationService} from "../../shared/services/services/pagination.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationDialogComponent} from "../delete-confirmation-dialog/delete-confirmation-dialog.component";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent extends BaseComponent {
  @Input() post: any;
  expandedPosts: { [key: number]: boolean } = {};

  constructor(private router: Router, authService: AuthService, private postService: PaginationService, private dialog: MatDialog) {
    super(authService);
  }

  togglePost(postId: number) {
    this.expandedPosts[postId] = !this.expandedPosts[postId];
  }

  get typeInfo() {
    const types: any = {
      review: { label: 'Review', color: '#4460ed', bg: 'rgba(68,96,237,0.08)' },
      post: { label: 'Discussion', color: '#64748b', bg: 'rgba(100,116,139,0.08)' },
      salary: { label: 'Salary', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
      question: { label: 'Question', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
      interview: { label: 'Interview', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
    };
    return types[this.post.type] || types.post;
  }

  get sentimentColor() {
    const s = this.post.sentiment;
    const map: any = { positive: '#10b981', negative: '#ef4444', mixed: '#f59e0b', neutral: '#64748b' };
    return map[s] || '#64748b';
  }

  reacting = false;

  onReact(type: 'LIKE' | 'DISLIKE') {
    this.reacting = true;
    this.postService.react(this.post.id, type).subscribe({
      next: (res) => {
        this.post.upvotes = res.likeCount;
        this.post.downvotes = res.dislikeCount;
        this.post.likedByUser = res.userReaction == 'LIKE';
        this.post.disLikedByUser = res.userReaction == 'DISLIKE';
        this.reacting = false;
      },
      error: () => { this.reacting = false; }
    });
  }

  viewProfile(id: any) {
    this.router.navigate(['/profile', id]);
  }

  editPost(postId: number): void {
    console.log('Edit clicked');
  }

  openDeleteDialog(postId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete Post',
        message: 'Are you sure you want to delete this post?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePost();
      }
    });
  }

  deletePost(): void {
    console.log('Post deleted');
  }


  protected readonly Utils = Utils;
}
