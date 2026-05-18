import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {LandingComponent} from "./landing/landing.component";
import {CreatePostCardComponent} from "./create-post-card/create-post-card.component";
import {CreatePostModalComponent} from "./create-post-modal/create-post-modal.component";
import {PostCardComponent} from "./post-card/post-card.component";
import {PostFeedComponent} from "./post-feed/post-feed.component";
import {RightSidebarComponent} from "./right-sidebar/right-sidebar.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {NavbarComponent} from "../shared/components/navbar/navbar.component";


@NgModule({
  declarations: [
      LandingComponent,
      CreatePostCardComponent,
      CreatePostModalComponent,
      PostCardComponent,
      PostFeedComponent,
      RightSidebarComponent,
      SidebarComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        CommonModule,
        NavbarComponent
    ]
})
export class DashboardModule { }
