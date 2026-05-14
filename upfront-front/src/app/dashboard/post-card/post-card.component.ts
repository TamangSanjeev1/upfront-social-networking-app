import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AVATARS } from '../../core/mock-data';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() post: any;

  get avatarBg() {
    return AVATARS.colors[this.post.avatarColor];
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

  get stars() {
    if (!this.post.rating) return '';
    const rating = this.post.rating;
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
  }

  formatNum(n: number) {
    if (n >= 1000) return (n/1000).toFixed(1) + 'K';
    return n.toString();
  }

  toggleVote(isUp: boolean) {
    if (isUp) {
      if (this.post.isUpvoted) { 
        this.post.upvotes--; 
        this.post.isUpvoted = false; 
      } else { 
        this.post.upvotes++; 
        this.post.isUpvoted = true; 
      }
    }
  }
}
