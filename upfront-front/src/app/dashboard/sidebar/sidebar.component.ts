import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseComponent} from "../../core/components/base.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent extends BaseComponent {
  @Input() isOpen = false;
  @Output() toggle = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }
}
