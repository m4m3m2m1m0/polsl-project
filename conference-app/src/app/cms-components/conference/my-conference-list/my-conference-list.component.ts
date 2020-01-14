import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Conference } from 'src/app/models/conference.model';
import { User } from 'src/app/models/user.model';
import { ConferenceState } from 'src/app/store/features/conference/conference-store/conference.reducers';
import { selectUserConferences, selectUserInterestedConferences } from 'src/app/store/features/conference/conference-store/conference.selectors';
import { ConferenceFacade } from 'src/app/store/features/conference/facades/conference.facade';
import { UserFacade } from 'src/app/store/features/user/facades/user.facade';

@Component({
  selector: 'app-conference-list',
  templateUrl: './my-conference-list.component.html',
  styleUrls: ['./my-conference-list.component.scss']
})
export class MyConferenceListComponent implements OnInit {

  user: User;

  userInterestedConferences$: Observable<Conference[]> = this._userFacade.getCurrentUser().pipe(
    filter(user => user !== undefined),
    map(user => {
      this.user = user;
      return this._conferenceFacade.loadUserInterestedConferences(user._id)
    }),
    switchMap(() => this._store.select(selectUserInterestedConferences))
  )

  userConferences$: Observable<Conference[]> = this._userFacade.getCurrentUser().pipe(
    filter(user => user !== undefined),
    map(user => this._conferenceFacade.loadUserConferences(user._id)),
    switchMap(() => this._store.select(selectUserConferences))
  )

  columnsToDisplay = ['name', 'country', 'city', 'category', 'priceRange', 'startDate', 'endDate', 'action'];

  constructor(
    protected _userFacade: UserFacade,
    protected _conferenceFacade: ConferenceFacade,
    protected _router: Router,
    protected _store: Store<ConferenceState>
  ) { }

  ngOnInit() {

  }

  showConferenceDetails(row: any) {
    this._router.navigateByUrl(`/conference/${row._id.$oid}`);
  }

  removeFromFavourite(row: any) {
    this._conferenceFacade.removeFavouriteConference(this.user._id, row._id.$oid);
    this._conferenceFacade.loadUserInterestedConferences(this.user._id);
  }

  removeConference(row: any) {
    this._conferenceFacade.removeConference(row._id.$oid);
    this._conferenceFacade.loadUserConferences(this.user._id);
  }

}
