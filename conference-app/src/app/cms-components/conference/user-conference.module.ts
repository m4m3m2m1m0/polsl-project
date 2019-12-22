import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatPaginatorModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ConferenceDetailsComponent } from './conference-details/conference-details.component';
import { ConferenceListComponent } from './conference-list/conference-list.component';
import { ConferenceMenuComponent } from './conference-menu/conference-menu.component';
import { MyConferenceListComponent } from './my-conference-list/my-conference-list.component';
import { NewConferenceDialogComponent } from './new-conference-dialog/new-conference-dialog.component';



@NgModule({
  declarations: [ConferenceListComponent, ConferenceMenuComponent, NewConferenceDialogComponent, MyConferenceListComponent, ConferenceDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatCardModule
  ],
  entryComponents: [ConferenceListComponent, NewConferenceDialogComponent, MyConferenceListComponent]
})
export class UserConferenceModule { }
