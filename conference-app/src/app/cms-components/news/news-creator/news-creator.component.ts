import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/occ/services/news/news.service';

@Component({
  selector: 'app-news-creator',
  templateUrl: './news-creator.component.html',
  styleUrls: ['./news-creator.component.scss']
})
export class NewsCreatorComponent implements OnInit {

  title: any = '';
  subtitle: any = '';
  description: any = '';
  date: any = '';

  constructor(
    protected _newsService: NewsService
  ) { }

  ngOnInit() {
  }

  addNews() {

    let news = {
      title: this.title,
      subtitle: this.subtitle,
      description: this.description,
      date: this.date
    }

    this._newsService.addNews(news).subscribe(res => location.reload());
  }
  
}
