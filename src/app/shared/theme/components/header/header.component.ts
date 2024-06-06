import { Component, EventEmitter, Output, signal } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'kea-header',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatToolbar
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() collapseEvent = new EventEmitter<boolean>();

  isCollapsed = signal(false);

  collapseSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
    this.collapseEvent.emit(this.isCollapsed().valueOf());
  }

}
