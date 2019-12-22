import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-conference-dialog',
  templateUrl: './new-conference-dialog.component.html',
  styleUrls: ['./new-conference-dialog.component.scss']
})
export class NewConferenceDialogComponent {

  description: string;
  conference: any;

  constructor(
    private dialogRef: MatDialogRef<NewConferenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
    this.conference = data.conference;
  }

  close() {
    this.dialogRef.close();
  }

}
