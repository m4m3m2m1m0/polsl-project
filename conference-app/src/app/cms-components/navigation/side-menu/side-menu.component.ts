import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsService } from 'src/app/occ/services/news/news.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  newses$: Observable<any> = this._newsService.getNewestNews();

  constructor(
    protected _newsService: NewsService
  ) { }

  ngOnInit() {
  }

}
