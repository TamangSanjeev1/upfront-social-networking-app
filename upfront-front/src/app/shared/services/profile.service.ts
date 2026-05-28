import { Injectable, signal, computed } from '@angular/core';
import { TempUserProfile } from '../models/user-profile.model';

export const MOCK_USER: TempUserProfile = {
  id: 'usr_a7f2c9d1',
  displayName: 'Alexandra Chen',
  username: 'alex.chen',
  title: 'Senior Full-Stack Engineer · Open Source Contributor',
  bio: `I build scalable web systems and obsess over developer experience. Currently working on distributed architectures at scale. Previously at Google and Stripe. I love mentoring junior devs, contributing to open source, and occasionally writing about the craft of software engineering.\n\nWhen not coding, you'll find me hiking, playing chess, or experimenting with generative art.`,
  location: 'San Francisco, CA',
  company: 'Vercel',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra&backgroundColor=b6e3f4',
  coverUrl: '',
  reputation: 24870,
  followers: 3421,
  following: 287,
  joinedDate: 'March 2019',
  isVerified: true,
  isFollowing: false,
  socialLinks: {
    github: 'https://github.com/alexchen',
    linkedin: 'https://linkedin.com/in/alexchen',
    portfolio: 'https://alexchen.dev',
    twitter: 'https://twitter.com/alexchen_dev',
    website: 'https://blog.alexchen.dev',
  },
  skills: [
    { name: 'Angular', level: 'expert', endorsements: 142 },
    { name: 'TypeScript', level: 'expert', endorsements: 198 },
    { name: 'Node.js', level: 'expert', endorsements: 167 },
    { name: 'React', level: 'expert', endorsements: 134 },
    { name: 'GraphQL', level: 'intermediate', endorsements: 89 },
    { name: 'Kubernetes', level: 'intermediate', endorsements: 73 },
    { name: 'Rust', level: 'intermediate', endorsements: 54 },
    { name: 'PostgreSQL', level: 'expert', endorsements: 112 },
    { name: 'Redis', level: 'intermediate', endorsements: 66 },
    { name: 'AWS', level: 'intermediate', endorsements: 91 },
    { name: 'Docker', level: 'expert', endorsements: 128 },
    { name: 'Go', level: 'beginner', endorsements: 32 },
  ],
  stats: {
    posts: 248,
    comments: 1847,
    reviews: 93,
    saved: 512,
    solutions: 67,
    upvotes: 18420,
  },
  activity: [
    {
      id: 'a1',
      type: 'post',
      title: 'Angular 17 Signals: A Complete Guide to Fine-Grained Reactivity',
      excerpt: 'Signals are the most impactful change to Angular in years. Here\'s everything you need to know about building reactive applications without the RxJS overhead...',
      tags: ['Angular', 'Signals', 'TypeScript', 'Frontend'],
      upvotes: 847,
      comments: 93,
      timestamp: '2 days ago',
      community: 'r/angular',
    },
    {
      id: 'a2',
      type: 'post',
      title: 'How I Reduced Our API Response Time by 60% Using Edge Caching',
      excerpt: 'A deep dive into our caching strategy that brought p95 latency from 450ms down to 180ms using Vercel Edge Network and stale-while-revalidate patterns...',
      tags: ['Performance', 'Edge', 'Caching', 'Backend'],
      upvotes: 1203,
      comments: 147,
      timestamp: '1 week ago',
      community: 'r/webdev',
    },
    {
      id: 'a3',
      type: 'comment',
      title: 'Re: Best practices for monorepo with pnpm workspaces?',
      excerpt: 'We\'ve been running a 40+ package monorepo with pnpm for 2 years. The key insight is to treat each package boundary as a contract...',
      tags: ['Monorepo', 'pnpm', 'DevOps'],
      upvotes: 312,
      comments: 28,
      timestamp: '3 days ago',
      community: 'r/javascript',
    },
    {
      id: 'a4',
      type: 'review',
      title: 'Code Review: Implementing optimistic UI updates in Angular',
      excerpt: 'Great approach overall! The signal-based store is clean. One thing I\'d reconsider is the error rollback strategy — currently it loses intermediate state...',
      tags: ['Code Review', 'Angular', 'UX'],
      upvotes: 89,
      comments: 14,
      timestamp: '5 days ago',
    },
    {
      id: 'a5',
      type: 'saved',
      title: 'The Architecture of Figma\'s Real-time Collaboration',
      excerpt: 'An in-depth look at how Figma handles conflict resolution and real-time sync across millions of concurrent users using CRDTs...',
      tags: ['Architecture', 'CRDT', 'Real-time', 'Systems'],
      upvotes: 5420,
      comments: 284,
      timestamp: '2 weeks ago',
      community: 'r/programming',
    },
    {
      id: 'a6',
      type: 'post',
      title: 'Building a Type-Safe Event Bus in TypeScript',
      excerpt: 'After using various event bus libraries, I decided to build a fully type-safe one from scratch. Here\'s the journey and the patterns that emerged...',
      tags: ['TypeScript', 'Design Patterns', 'Architecture'],
      upvotes: 634,
      comments: 71,
      timestamp: '2 weeks ago',
      community: 'r/typescript',
    },
  ],
};

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private _profile = signal<TempUserProfile>(MOCK_USER);
  private _isLoading = signal<boolean>(false);
  private _isDarkMode = signal<boolean>(false);

  readonly profile = this._profile.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly isDarkMode = this._isDarkMode.asReadonly();

  readonly followerCount = computed(() => this._profile().followers);
  readonly reputationFormatted = computed(() => {
    const rep = this._profile().reputation;
    return rep >= 1000 ? `${(rep / 1000).toFixed(1)}k` : rep.toString();
  });

  updateProfile(updates: Partial<TempUserProfile>): void {
    this._profile.update(p => ({ ...p, ...updates }));
  }

  toggleFollow(): void {
    this._profile.update(p => ({
      ...p,
      isFollowing: !p.isFollowing,
      followers: p.isFollowing ? p.followers - 1 : p.followers + 1,
    }));
  }

  toggleDarkMode(): void {
    this._isDarkMode.update(v => !v);
    document.documentElement.classList.toggle('dark', this._isDarkMode());
  }

  simulateLoading(): void {
    this._isLoading.set(true);
    setTimeout(() => this._isLoading.set(false), 1800);
  }
}
