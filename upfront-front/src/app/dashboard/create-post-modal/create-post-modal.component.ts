import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrl: './create-post-modal.component.css'
})
export class CreatePostModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  postType = 'post';

  setPostType(type: string) {
    this.postType = type;
  }
}
