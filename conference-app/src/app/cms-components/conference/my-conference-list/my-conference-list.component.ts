import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ConferenceFacade } from 'src/app/store/features/conference/facades/conference.facade';
import { UserFacade } from 'src/app/store/features/user/facades/user.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conference-list',
  templateUrl: './my-conference-list.component.html',
  styleUrls: ['./my-conference-list.component.scss']
})
export class MyConferenceListComponent implements OnInit {

  userInterestedConferences$: Observable<any[]> = this._userFacade.getCurrentUser().pipe(
    filter(user => user !== undefined),
    map(user => this._conferenceFacade.loadUserInterestedConferences(user.userName)),
    switchMap(() => this._conferenceFacade.getUserInterestedConferences())
  )

  constructor(
    protected _userFacade: UserFacade,
    protected _conferenceFacade: ConferenceFacade,
    protected _router: Router
  ) { }

  ngOnInit() {

  }

  showConference(confId: any) {
    this._router.navigateByUrl(`/conference/${confId}`);
  }

  deleteConf(confId: any) {
    console.log('delete')
  }


}
