import { Component, effect, input, signal } from '@angular/core';
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

  label = input.required<string>();

  isHeaderRendered = signal(false);
  isFooterRendered = signal(false);


  constructor() {
    effect(() => {
      this.label.length > 0 ?
        console.log("One") :
        console.log("Two");
    });
  }

}
