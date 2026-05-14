import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-post-card',
  templateUrl: './create-post-card.component.html',
  styleUrl: './create-post-card.component.css'
})
export class CreatePostCardComponent {
  @Output() open = new EventEmitter<void>();

  onOpen() {
    this.open.emit();
  }
}
