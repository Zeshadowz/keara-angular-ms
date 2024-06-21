import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'kea-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kea-dialog.component.html',
  styleUrl: './kea-dialog.component.scss'
})
export class KeaDialogComponent {

  //readonly dialogRef = inject(MatDialogRef<KeaDialogComponent>);

}
