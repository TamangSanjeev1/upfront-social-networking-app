import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileHeaderComponent} from "./profile-header/profile-header.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatChipsModule} from "@angular/material/chips";
import {ProfileLinksComponent} from "./profile-links/profile-links.component";
import {ProfileBioComponent} from "./profile-bio/profile-bio.component";
import {ProfileStatsComponent} from "./profile-stats/profile-stats.component";


@NgModule({
  declarations: [
    ProfileHeaderComponent,
    ProfileLinksComponent,
    ProfileBioComponent,
      ProfileStatsComponent
  ],
  exports: [
    ProfileHeaderComponent,
    ProfileLinksComponent,
    ProfileBioComponent,
    ProfileStatsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule
  ]
})
export class ProfileModule { }
