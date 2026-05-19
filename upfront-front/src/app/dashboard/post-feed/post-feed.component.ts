import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POSTS } from '../../core/mock-data';
import { PostCardComponent } from '../post-card/post-card.component';
import {filter, Subscription} from "rxjs";
import {BaseService} from "../../shared/services/base-service/base.service";
import {Apiconstants} from "../../shared/apiconstants";
import {Post} from "../../shared/models/user-profile.model";
import {RefreshService} from "../../shared/services/services/refresh-service";

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
  private subscription?: Subscription;

  constructor(private apiService: BaseService, private refreshService: RefreshService) {
  }

  ngOnInit() {
    this.fetchPosts();

    this.subscription =
        this.refreshService.refresh$
            .subscribe(() => {
              this.fetchPosts();
            });
  }

  fetchPosts() {
    this.apiService.getRequest(Apiconstants.POST).subscribe(response => {
      this.posts = [...response];
      this.filteredPosts = [...response];
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
    // For demo purposes, we just shuffle or filter based on mock data
    if (this.activeFilter === 'reviews') {
      this.filteredPosts = this.posts.filter(p => p.type === 'review');
    } else if (this.activeFilter === 'salaries') {
      this.filteredPosts = this.posts.filter(p => p.type === 'salary');
    } else if (this.activeFilter === 'interviews') {
      this.filteredPosts = this.posts.filter(p => p.type === 'interview');
    } else {
      this.filteredPosts = [...this.posts];
    }
  }
}
