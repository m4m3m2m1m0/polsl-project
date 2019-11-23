import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenMapsComponent } from './open-maps/open-maps.component';
import { ConferenceDialogComponent } from './conference-dialog/conference-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [OpenMapsComponent, ConferenceDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  entryComponents: [OpenMapsComponent, ConferenceDialogComponent]
})
export class OpenMapsModule { }
