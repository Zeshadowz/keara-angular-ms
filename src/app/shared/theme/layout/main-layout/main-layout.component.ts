import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'kea-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatIconButton,
    MatSidenavModule,
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  isSidebarCollapsed = signal(false);

  computeCollapse($event: boolean) {
    this.isSidebarCollapsed.set($event)
  }

  sidenavWidth = computed(() => this.isSidebarCollapsed() ? '65px' : '250px');

}
