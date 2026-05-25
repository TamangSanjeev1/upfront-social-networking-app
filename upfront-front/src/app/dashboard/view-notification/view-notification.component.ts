import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {Apiconstants} from "../../shared/apiconstants";
import console from "node:console";
import {PaginationService} from "../../shared/services/services/pagination.service";
import {Utils} from "../../shared/utils/utils";

@Component({
  selector: 'app-view-notification',
  standalone: true,
  imports: [
      CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  templateUrl: './view-notification.component.html',
  styleUrl: './view-notification.component.scss'
})
export class ViewNotificationComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private notificationService = inject(PaginationService);
  displayedColumns = ['read', 'icon', 'title', 'body', 'createdDate', 'type'];
  dataSource = new MatTableDataSource<any>([]);
  loading = false;
  totalElements: number = 0;

  private readonly avatarColors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#0ea5e9',
    '#10b981', '#f59e0b', '#ef4444', '#14b8a6'
  ];

  fetchNotifications(page: number = 0, size: number = 10) {
    this.notificationService.getByPagination(page, size, Apiconstants.NOTIFICATION).subscribe({
      next: (response) => {
        this.dataSource.data = response.content
        this.totalElements = response.totalElements;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.fetchNotifications(event.pageIndex, event.pageSize);
    });

    this.fetchNotifications();
  }

  onRowClick(row: any) {
    this.notificationService.getById(Apiconstants.READ, row.id).subscribe({
      next: (response)=> {
        row.unread = false;
      },
      error:(err) => {
        console.log(err);
      }
    });  }

    protected readonly Utils = Utils;
}
