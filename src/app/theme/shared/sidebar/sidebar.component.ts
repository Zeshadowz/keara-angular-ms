import { Component, computed, Input, signal } from '@angular/core';
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from "@angular/material/list";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'kea-sidebar',
  standalone: true,
  imports: [
    MatNavList,
    MatListItem,
    MatIcon,
    MatListItemIcon,
    MatListItemTitle,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  //https://fonts.google.com/icons?icon.set=Material+Symbols&selected=Material+Symbols+Outlined:person:FILL@0;wght@400;GRAD@0;opsz@24&icon.size=24&icon.color=%235f6368
  //https://www.youtube.com/watch?v=Sq5tdKKBz7Q&ab_channel=ZoaibKhan
  sidenavCollapsed = signal(false);

  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value);
  }

  profilePicSize = computed(() => this.sidenavCollapsed() ? '32' : '100');

  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Home',
      route: 'home',
    }, {
      icon: 'person',
      label: 'employees',
      route: 'employees',
    }
  ])
}
