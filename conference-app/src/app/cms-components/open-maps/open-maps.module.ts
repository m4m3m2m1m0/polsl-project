import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenMapsComponent } from './open-maps/open-maps.component';



@NgModule({
  declarations: [OpenMapsComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [OpenMapsComponent]
})
export class OpenMapsModule { }
