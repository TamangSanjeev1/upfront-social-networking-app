import {Component, inject} from '@angular/core';
import {ProfileService} from "../../shared/services/profile.service";
import {ProfileSkillsComponent} from "../profile-skills/profile-skills.component";
import {ProfileActivityTabsComponent} from "../profile-activity-tabs/profile-activity-tabs.component";
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import {ProfileModule} from "../profile.module";
import {DashboardModule} from "../../dashboard/dashboard.module";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {UserService} from "../../shared/services/services/user.service";
import {UserProfileBaseComponent} from "../base-files/user-profile-base.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ProfileSkillsComponent,
    ProfileActivityTabsComponent,
    NavbarComponent,
    ProfileModule,
    DashboardModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends UserProfileBaseComponent {
  protected ps = inject(ProfileService);
  sidebarOpen = false;
  createModalOpen = false;

  constructor(authService: AuthService,private route: ActivatedRoute, userService: UserService) {
    super(authService, userService);
  }

  ngOnInit(): void {
    this.ps.simulateLoading();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.viewUserDetails(id);
    }
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
