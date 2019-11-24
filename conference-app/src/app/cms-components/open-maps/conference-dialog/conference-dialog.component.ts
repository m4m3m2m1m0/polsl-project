import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-conference-dialog',
  templateUrl: './conference-dialog.component.html',
  styleUrls: ['./conference-dialog.component.scss']
})
export class ConferenceDialogComponent {

  description: string;
  conference: any;

  constructor(
    private dialogRef: MatDialogRef<ConferenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
    this.conference = data.conference;
  }

  close() {
    this.dialogRef.close();
  }

}
