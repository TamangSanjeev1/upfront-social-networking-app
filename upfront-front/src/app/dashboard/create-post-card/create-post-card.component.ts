import { Component, EventEmitter, Output } from '@angular/core';
import {BaseComponent} from "../../core/components/base.component";
import {AuthService} from "../../core/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostModalComponent} from "../create-post-modal/create-post-modal.component";

@Component({
  selector: 'app-create-post-card',
  templateUrl: './create-post-card.component.html',
  styleUrl: './create-post-card.component.css'
})
export class CreatePostCardComponent extends BaseComponent {
  @Output() open = new EventEmitter<void>();

  constructor(authService: AuthService, private dialog: MatDialog) {
    super(authService);
  }

  onOpen() {
      const dialogRef = this.dialog.open(CreatePostModalComponent, {
        width: '700px',
        maxHeight: '90vh',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result?.created) {
          // this.fetchPosts();
        }
      });
  }

}
