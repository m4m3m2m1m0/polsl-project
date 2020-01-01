import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { BannerCarouselComponent } from './banner-carousel/banner-carousel.component';
import { HomepageComponent } from './homepage/homepage.component';


@NgModule({
  declarations: [HomepageComponent, BannerCarouselComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatCarouselModule.forRoot(),
  ]
})
export class HomepageModule { }
