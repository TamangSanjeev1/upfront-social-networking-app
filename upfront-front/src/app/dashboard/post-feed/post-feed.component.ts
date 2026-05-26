import {Component, ElementRef, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {Subscription, takeUntil} from "rxjs";
import {Post} from "../../shared/models/user-profile.model";
import {RefreshService} from "../../shared/services/services/refresh-service";
import {PaginationService} from "../../shared/services/services/pagination.service";
import {Apiconstants} from "../../shared/apiconstants";
import {BaseComponent} from "../../core/components/base.component";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.css'
})
export class PostFeedComponent extends BaseComponent implements OnInit, OnDestroy {
  posts = signal<Post[]>([]);
  activeFilter = 'hot';
  fadeOut = false;
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;
  private subscription?: Subscription;
  constructor(authService: AuthService, private refreshService: RefreshService, private postService: PaginationService) {
    super(authService);
  }

  ngOnInit() {
    this.fetchPosts();

    this.subscription =
        this.refreshService.refresh$
            .subscribe(() => {
              this.page = 0;
              this.size = 10;
              this.hasMore = true;
              this.fetchPosts(true);
            });
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    super.destroy();
  }

  fetchPosts(fetchFromFirst: boolean = false) {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;
    this.error = null;

    const request$ = this.activeFilter != "hot"
        ? this.postService.getPostsByTag(this.activeFilter, this.page, this.size)
        : this.postService.getByPagination(this.page, this.size, Apiconstants.POST);

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
    this.posts.set([]);
    this.fetchPosts();
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
}
