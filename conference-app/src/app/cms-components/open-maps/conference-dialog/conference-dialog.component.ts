import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conference-dialog',
  templateUrl: './conference-dialog.component.html',
  styleUrls: ['./conference-dialog.component.scss']
})
export class ConferenceDialogComponent {

  description: string;
  conference: any;

  constructor(
    protected _router: Router,
    protected _dialogRef: MatDialogRef<ConferenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.description = data.description;
    this.conference = data.conference;
  }

  close() {
    this._dialogRef.close();
  }

  showConferenceDetails(confId) {
    this._router.navigateByUrl(`/conference/${confId}`);
    this._dialogRef.close();
  }

}
