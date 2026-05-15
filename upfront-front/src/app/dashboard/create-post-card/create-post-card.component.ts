import { Component, EventEmitter, Output } from '@angular/core';
import {BaseComponent} from "../../core/components/base.component";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-create-post-card',
  templateUrl: './create-post-card.component.html',
  styleUrl: './create-post-card.component.css'
})
export class CreatePostCardComponent extends BaseComponent {
  @Output() open = new EventEmitter<void>();

  constructor(authService: AuthService) {
    super(authService);
  }

  onOpen() {
    this.open.emit();
  }
}
