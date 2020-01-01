import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFacade } from 'src/app/store/features/user/facades/user.facade';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  isLogged$: Observable<boolean> = this._userFacade.isUserLogged();;

  constructor(
    protected _userFacade: UserFacade
  ) { }

  logout() {
    this._userFacade.logutUser();
  }

}
