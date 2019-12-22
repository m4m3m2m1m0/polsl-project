import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatPaginator, MatTableDataSource, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Conference } from 'src/app/models/conference.model';
import { ConferenceFacade } from 'src/app/store/features/conference/facades/conference.facade';

@Component({
  selector: 'app-conference-list',
  templateUrl: './conference-list.component.html',
  styleUrls: ['./conference-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ConferenceListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  sortOptions: any = {
    city: null,
    country: null,
    category: null,
    maxPrice: null,
    startDate: null
  }

  columnsToDisplay = ['name', 'country', 'city', 'category', 'priceRange', 'startDate', 'endDate'];

  allConferences$: Observable<MatTableDataSource<Conference>> = this._conferenceFacade.getAvailableConferences().pipe(
    map(conferences => {
      let data = new MatTableDataSource<Conference>(conferences)
      data.paginator = this.paginator;
      this.conferences = data;
      return data;
    })
  );

  conferences: MatTableDataSource<Conference>;

  constructor(
    protected _conferenceFacade: ConferenceFacade,
    protected _router: Router
  ) { }

  ngOnInit() {
    this._conferenceFacade.loadAvailableConferences(new Date())
  }

  showConferenceDetails(row: Conference) {
    this._router.navigateByUrl(`/conference/${row.id}`);
  }

  sortData(sort: Sort) {
    const data = this.conferences.data.slice();
    if (!sort.active || sort.direction === '') {
      let finalData = new MatTableDataSource<Conference>(data);
      finalData.paginator = this.paginator;
      this.allConferences$ = of(finalData);
      return;
    }

    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'startDate': return this.dateCompare(a.startDate, b.startDate, isAsc);
        case 'endDate': return this.dateCompare(a.endDate, b.endDate, isAsc);
        case 'category': return this.compare(a.category, b.category, isAsc);
        case 'priceRange': return this.priceCompare(a.priceRange.lowest, a.priceRange.highest, b.priceRange.lowest, b.priceRange.highest, isAsc);
        case 'city': return this.compare(a.address.city, b.address.city, isAsc);
        case 'country': return this.compare(a.address.country, b.address.country, isAsc);
        default: return 0;
      }
    });

    let finalData = new MatTableDataSource<Conference>(sortedData);
    finalData.paginator = this.paginator;
    this.allConferences$ = of(finalData);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  dateCompare(a: string, b: string, isAsc: boolean) {
    return (new Date(a) < new Date(b) ? -1 : 1) * (isAsc ? 1 : -1);
  }

  priceCompare(lowestA: string, highestA: string, lowestB: string, highestB: string, isAsc: boolean) {
    if (isAsc) {
      return (+lowestA < +lowestB ? -1 : 1) * (isAsc ? 1 : -1);
    } else {
      return (+highestA < +highestB ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

  filterCity(city: string) {
    this.sortOptions.city = city;
    this.filterConferenceData(this.sortOptions);
  }

  filterCountry(country: string) {
    this.sortOptions.country = country;
    this.filterConferenceData(this.sortOptions);
  }

  filterPrice(price: string) {
    this.sortOptions.maxPrice = price;
    this.filterConferenceData(this.sortOptions);
  }

  filterCategory(category: string) {
    this.sortOptions.category = category;
    this.filterConferenceData(this.sortOptions);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.sortOptions.startDate = event.value;
    this.filterConferenceData(this.sortOptions);
  }

  filterConferenceData(sortOptions: any) {

    let filtered = this.conferences.data;
    if (sortOptions.city !== '' && sortOptions.city !== null) filtered = filtered.filter(c => c.address.city.toLowerCase().includes(sortOptions.city));

    if (sortOptions.country !== '' && sortOptions.country !== null) filtered = filtered.filter(c => c.address.country.toLowerCase().includes(sortOptions.country));

    if (sortOptions.maxPrice !== '' && sortOptions.maxPrice !== null) {
      filtered = filtered.filter(c => {
        if (+sortOptions.maxPrice <= +c.priceRange.highest && +sortOptions.maxPrice >= +c.priceRange.lowest) return c;
      })
    }

    if (sortOptions.category !== '' && sortOptions.category !== null) filtered = filtered.filter(c => c.category.toLowerCase().includes(sortOptions.category));

    if (sortOptions.startDate !== '' && sortOptions.startDate !== null) {
      filtered = filtered.filter(c => new Date(c.startDate) >= sortOptions.startDate);
    }

    let data = new MatTableDataSource<Conference>(filtered);
    data.paginator = this.paginator;
    this.allConferences$ = of(data);
  }

}
