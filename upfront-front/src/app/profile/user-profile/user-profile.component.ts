import {Component, inject} from '@angular/core';
import {ProfileService} from "../../shared/services/profile.service";
import {ProfileBioComponent} from "../profile-bio/profile-bio.component";
import {ProfileLinksComponent} from "../profile-links/profile-links.component";
import {ProfileStatsComponent} from "../profile-stats/profile-stats.component";
import {ProfileSkillsComponent} from "../profile-skills/profile-skills.component";
import {ProfileActivityTabsComponent} from "../profile-activity-tabs/profile-activity-tabs.component";
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import {ProfileModule} from "../profile.module";
import {DashboardModule} from "../../dashboard/dashboard.module";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ProfileStatsComponent,
    ProfileSkillsComponent,
    ProfileActivityTabsComponent,
    NavbarComponent,
    ProfileModule,
    DashboardModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  protected ps = inject(ProfileService);
  sidebarOpen = false;
  createModalOpen = false;

  ngOnInit(): void {
    this.ps.simulateLoading();
  }


  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openCreatePost() {
    this.createModalOpen = true;
  }

  closeCreatePost() {
    this.createModalOpen = false;
  }
}
