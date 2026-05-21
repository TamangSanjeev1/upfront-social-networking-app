import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription, takeUntil} from "rxjs";
import {BaseService} from "../../shared/services/base-service/base.service";
import {Post} from "../../shared/models/user-profile.model";
import {RefreshService} from "../../shared/services/services/refresh-service";
import {PostService} from "../../shared/services/services/post.service";

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.css'
})
export class PostFeedComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  activeFilter = 'hot';
  fadeOut = false;
  page = 0;
  size = 10;
  isLoading = false;
  isInitialLoad = true;
  hasMore = true;
  error: string | null = null;
  private subscription?: Subscription;
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;
  private observer!: IntersectionObserver;
  private destroy$ = new Subject<void>();

  constructor(private apiService: BaseService, private refreshService: RefreshService, private postService: PostService, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.fetchPosts();

    this.subscription =
        this.refreshService.refresh$
            .subscribe(() => {
              this.fetchPosts();
            });
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.observer?.disconnect();
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

  fetchPosts() {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;
    this.error = null;

    const request$ = this.activeFilter != "hot"
        ? this.postService.getPostsByTag(this.activeFilter, this.page, this.size)
        : this.postService.getPosts(this.page, this.size);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.posts = [...this.posts, ...response.content];
        this.filteredPosts = [...this.posts];
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

  trackByPostId(_index: number, post: Post): string {
    return post.id;
  }

  setFilter(filter: string) {
    if (this.activeFilter === filter) return;
    this.activeFilter = filter;
    
    // Animation logic
    this.fadeOut = true;
    setTimeout(() => {
      this.applyFilter();
      this.fadeOut = false;
    }, 150);
  }

  applyFilter() {
    this.hasMore = true;
    this.page = 0;
    this.size = 10;
    this.isInitialLoad = true;
    this.posts = [];
    this.filteredPosts = [];
    this.fetchPosts();
  }
}
