import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TRENDING_COMPANIES } from '../../core/mock-data';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.css'
})
export class RightSidebarComponent {
  trendingCompanies = [...TRENDING_COMPANIES];
}
