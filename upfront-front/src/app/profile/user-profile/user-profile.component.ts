import {Component, inject} from '@angular/core';
import {ProfileService} from "../../shared/services/profile.service";
import {ProfileHeaderComponent} from "../profile-header/profile-header.component";
import {ProfileBioComponent} from "../profile-bio/profile-bio.component";
import {ProfileLinksComponent} from "../profile-links/profile-links.component";
import {ProfileStatsComponent} from "../profile-stats/profile-stats.component";
import {ProfileSkillsComponent} from "../profile-skills/profile-skills.component";
import {ProfileActivityTabsComponent} from "../profile-activity-tabs/profile-activity-tabs.component";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ProfileBioComponent,
    ProfileLinksComponent,
    ProfileStatsComponent,
    ProfileSkillsComponent,
    ProfileActivityTabsComponent,
    MatTooltip,
    MatIcon
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  protected ps = inject(ProfileService);

  ngOnInit(): void {
    this.ps.simulateLoading();
  }
}
