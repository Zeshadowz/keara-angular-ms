import { Component, computed, Input, signal } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from "@angular/material/card";

@Component({
  selector: 'kea-widgets',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardTitle
  ],
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.scss'
})
export class WidgetsComponent {

  private label: string = "";

  @Input({alias: 'label'}) set _label(value: string) {
    this.label = value;
  }

  isHeaded = computed(() => this.label.length > 0);
  isFooterRendered = signal(false);

  getLabel() {
    return this.label;
  }

}
