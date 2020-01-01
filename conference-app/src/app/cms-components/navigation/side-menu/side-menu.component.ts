import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/occ/services/news/news.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  newses: Observable<any> = this._newsService.getNewestNews();
  
  constructor(
    protected _newsService: NewsService
  ) { }

  ngOnInit() {
  }

}
