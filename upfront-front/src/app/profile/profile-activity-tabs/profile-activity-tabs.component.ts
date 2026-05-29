import {Component, DestroyRef, ElementRef, OnDestroy, OnInit, signal, ViewChild,} from '@angular/core';
import {Post} from "../../shared/models/user-profile.model";
import {UserProfileBaseComponent} from "../base-files/user-profile-base.component";
import {Apiconstants} from "../../shared/apiconstants";
import {Subscription, takeUntil} from "rxjs";
import {PaginationService} from "../../shared/services/services/pagination.service";
import {Utils} from "../../shared/utils/utils";
import {AuthService} from "../../core/services/auth.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

type TabType = 'post' | 'review' | 'comment' | 'saved';

interface Tab {
  type: TabType | 'all';
  label: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-profile-activity-tabs',
  templateUrl: './profile-activity-tabs.component.html',
  styleUrls: ['./profile-activity-tabs.component.scss'],
})
export class ProfileActivityTabsComponent extends UserProfileBaseComponent implements OnInit, OnDestroy {
  protected activeTab = signal<TabType | 'all'>('all');
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;
  posts = signal<Post[]>([]);
  activeFilter = 'all';
  expandedPosts: { [key: string]: boolean } = {};
  reacting = false;

  readonly tabs: Tab[] = [
    { type: 'all', label: 'All', icon: 'view_list', count: 0 },
    { type: 'post', label: 'Posts', icon: 'article', count: 0 },
    { type: 'review', label: 'Reviews', icon: 'rate_review', count: 0 },
    { type: 'comment', label: 'Comments', icon: 'chat_bubble_outline', count: 0 },
    { type: 'saved', label: 'Saved', icon: 'bookmark_border', count: 0 },
  ];
  private subscription?: Subscription;

  constructor(authService: AuthService, private postService: PaginationService, private destroyRef: DestroyRef) {
    super(authService);
  }

  ngOnInit() {
    this.fetchPosts();

    this.subscription =
        this.refreshService.refresh$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this.page = 0;
              this.size = 10;
              this.hasMore = true;
              this.fetchPosts(true);
            });
  }

  updateTabCounts(): void {
    this.tabs.forEach(tab => {
      tab.count =
          tab.type === 'all'
              ? this.posts().length
              : this.posts().filter(post => post.type === tab.type).length;
    });
  }

  onTabChange(tab: any) {
    this.activeTab.set(tab.type);
    if (this.activeFilter != tab.type) {
      this.posts.set([]);
      this.page = 0;
      this.size = 10;
      this.hasMore = true;
    }
    this.activeFilter = tab.type;
    this.fetchPosts();
  }

  typeConfig(type: string): { color: string; bg: string; icon: string; label: string } {
    const configs: Record<string, { color: string; bg: string; icon: string; label: string }> = {
      post:    { color: '#6366f1', bg: 'rgba(99,102,241,0.1)',  icon: 'article',           label: 'Post'    },
      comment: { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)',   icon: 'chat_bubble_outline', label: 'Comment' },
      review:  { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  icon: 'rate_review',       label: 'Review'  },
      saved:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  icon: 'bookmark_border',   label: 'Saved'   },
    };
    return configs[type] || configs['post'];
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  override ngOnDestroy(): void {
    super.destroy();
  }

  fetchPosts(fetchFromFirst: boolean = false) {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;
    this.error = null;
    const request$ = this.activeFilter != "all"
        ? this.postService.getPostsByTag(this.activeFilter, this.page, this.size, this.viewUserInfo ? this.viewUserInfo!.id : this.user()!.id)
        : this.postService.getByPagination(this.page, this.size, Apiconstants.POST, this.viewUserInfo ? this.viewUserInfo!.id : this.user()!.id);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (!fetchFromFirst) {
          this.posts.update(posts => [
            ...posts,
            ...response.content
          ]);
        } else {
          this.posts.set(response.content);
        }
        this.updateTabCounts();
        this.hasMore = !response.last;
        this.page++;
        this.isLoading = false;
        this.isInitialLoad = false;
      },
      error: (err) => {
        this.error = 'Failed to load posts!';
        this.isLoading = false;
        this.isInitialLoad = false;
        console.error(err);
      }
    });
  }

  setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && !this.isLoading && this.hasMore) {
            this.ngZone.run(() => this.fetchPosts());
          }
        },
        { threshold: 0.1, rootMargin: '200px' }
    );
    if (this.scrollAnchor) {
      this.observer.observe(this.scrollAnchor.nativeElement);
    }
  }

  sentimentColor(post: Post) {
    const s = post.sentiment;
    const map: any = { positive: '#10b981', negative: '#ef4444', mixed: '#f59e0b', neutral: '#64748b' };
    return map[s] || '#64748b';
  }

  togglePost(postId: number) {
    this.expandedPosts[postId] = !this.expandedPosts[postId];
  }

  onReact(type: 'LIKE' | 'DISLIKE', id: number) {
    this.reacting = true;
    this.postService.react(id, type).subscribe({
      next: (res) => {
        this.posts.update(posts =>
            posts.map(post =>
                post.id === id
                    ? {
                      ...post,
                      upvotes: res.likeCount,
                      downvotes: res.dislikeCount,
                      likedByUser: res.userReaction === 'LIKE',
                      disLikedByUser: res.userReaction === 'DISLIKE'
                    }
                    : post
            )
        );
        this.reacting = false;
      },
      error: () => { this.reacting = false; }
    });
  }


  protected readonly Utils = Utils;
}
