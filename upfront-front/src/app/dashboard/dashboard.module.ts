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
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


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
    exports: [
        PostCardComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        CommonModule,
        NavbarComponent,
        ReactiveFormsModule,
        MatButton,
        MatIcon,
        MatProgressSpinner
    ]
})
export class DashboardModule { }
