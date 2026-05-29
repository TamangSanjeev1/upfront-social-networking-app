import {Component, inject} from '@angular/core';
import {ProfileService} from "../../shared/services/profile.service";
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import {ProfileModule} from "../profile.module";
import {DashboardModule} from "../../dashboard/dashboard.module";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {UserProfileBaseComponent} from "../base-files/user-profile-base.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
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

  constructor(authService: AuthService,private route: ActivatedRoute) {
    super(authService);
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
