import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { NgTemplateOutlet } from "@angular/common";

export interface DialogData {
  title?: string;
  acceptButtonText?: string;
  declineButtonText?: string;
  dialogContent: TemplateRef<any>;
}

@Component({
  selector: 'kea-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    NgTemplateOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kea-dialog.component.html',
  styleUrl: './kea-dialog.component.scss'
})
export class KeaDialogComponent implements OnInit {

  title: string = 'Kea Dialog';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    data.acceptButtonText ?? 'Confirm';
    data.declineButtonText ?? 'Decline';
    data.title ?? 'Kea Dialog';
  }

  ngOnInit(): void {
  }

  //readonly dialogRef = inject(MatDialogRef<KeaDialogComponent>);

}
