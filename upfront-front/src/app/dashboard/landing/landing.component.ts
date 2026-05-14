import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  sidebarOpen = false;
  createModalOpen = false;

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
