import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ConferenceDialogComponent } from './conference-dialog/conference-dialog.component';
import { OpenMapsComponent } from './open-maps/open-maps.component';

@NgModule({
  declarations: [OpenMapsComponent, ConferenceDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule
  ],
  entryComponents: [OpenMapsComponent, ConferenceDialogComponent]
})
export class OpenMapsModule { }
