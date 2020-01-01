import { Component } from '@angular/core';
import { UserFacade } from './store/features/user/facades/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    protected _userFacade: UserFacade
  ) { }
  
  ngOnInit(): void {
    const userCrypted = localStorage.getItem('user');
    if (userCrypted !== null) {
      let user: any = JSON.parse(atob(userCrypted));
      this._userFacade.loginUser({ userName: user.name, password: user.password })
    }
  }


}
