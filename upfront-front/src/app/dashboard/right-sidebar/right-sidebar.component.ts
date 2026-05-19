import {Component} from '@angular/core';
import {TRENDING_COMPANIES} from '../../core/mock-data';
import {BaseComponent} from "../../core/components/base.component";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.css'
})
export class RightSidebarComponent extends BaseComponent {
  trendingCompanies = [...TRENDING_COMPANIES];

  constructor(authService: AuthService) {
    super(authService);
  }
}
