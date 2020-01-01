import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatCarouselSlideComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-banner-carousel',
  templateUrl: './banner-carousel.component.html',
  styleUrls: ['./banner-carousel.component.scss']
})
export class BannerCarouselComponent {

  public slidesList: Array<any> = [];
  public showContent = false;


  @ViewChildren(MatCarouselSlideComponent) public carouselSlides: QueryList<
    MatCarouselSlideComponent
  >;
  public darkMode = false;

  ngOnInit(): void {

    let slideConf1 = {
      name: "conference_1",
      src: "assets/img/conf1.jpg"
    }

    let slideConf2 = {
      name: "conference_2",
      src: "assets/img/conf2.jpg"
    }

    let slideConf3 = {
      name: "conference_2",
      src: "assets/img/conf3.jpg"
    }

    this.slidesList.push(slideConf1);
    this.slidesList.push(slideConf2);
    this.slidesList.push(slideConf3);
  }
}
