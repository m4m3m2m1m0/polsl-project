import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Conference } from 'src/app/models/conference.model';
import { ConferenceFacade } from 'src/app/store/features/conference/facades/conference.facade';
import { UserFacade } from 'src/app/store/features/user/facades/user.facade';

@Component({
  selector: 'app-conference-list',
  templateUrl: './my-conference-list.component.html',
  styleUrls: ['./my-conference-list.component.scss']
})
export class MyConferenceListComponent implements OnInit {

  userInterestedConferences$: Observable<Conference[]> = this._userFacade.getCurrentUser().pipe(
    filter(user => user !== undefined),
    map(user => this._conferenceFacade.loadUserInterestedConferences(user.userName)),
    switchMap(() => this._conferenceFacade.getUserInterestedConferences())
  )

  columnsToDisplay = ['name', 'country', 'city', 'category', 'priceRange', 'startDate', 'endDate', 'action'];

  constructor(
    protected _userFacade: UserFacade,
    protected _conferenceFacade: ConferenceFacade,
    protected _router: Router
  ) { }

  ngOnInit() {

  }

  showConferenceDetails(row: Conference) {
    this._router.navigateByUrl(`/conference/${row.id}`);
  }

  removeFromFavourite(row: Conference) {
    // TODO: remove from fav action //
    console.log('delete from fav')
  }

  removeConference(row: Conference) {
    // TODO: remove conference action //
    console.log('delete conference')
  }

}
