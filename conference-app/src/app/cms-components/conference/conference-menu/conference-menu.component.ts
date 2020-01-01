import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NewConferenceDialogComponent } from '../new-conference-dialog/new-conference-dialog.component';

@Component({
  selector: 'app-conference-menu',
  templateUrl: './conference-menu.component.html',
  styleUrls: ['./conference-menu.component.scss']
})
export class ConferenceMenuComponent implements OnInit {

  constructor(
    protected _dialogService: MatDialog
  ) { }

  ngOnInit() {
  }

  openConferenceModal() {
    let dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners',
    };

    this._dialogService.open(NewConferenceDialogComponent, dialogConfig);
  }

}
