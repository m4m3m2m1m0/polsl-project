import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCreatorComponent } from './news-creator/news-creator.component';
import { MatFormFieldModule, MatDatepickerModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NewsCreatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  entryComponents: [NewsCreatorComponent]
})
export class NewsModule { }
