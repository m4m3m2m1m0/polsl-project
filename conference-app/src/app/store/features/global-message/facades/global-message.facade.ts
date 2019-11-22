import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalMessage } from 'src/app/models/global-message.model';
import { GlobalMessageActions } from '../global-message-store/global-message-action-types';
import { GlobalMessageState } from '../global-message-store/global-message.reducers';

@Injectable({
  providedIn: 'root'
})
export class GlobalMessageFacade {

  constructor(
    protected _store: Store<GlobalMessageState>
  ) { }

  addGlobalMessage(message: GlobalMessage): void {
    this._store.dispatch(GlobalMessageActions.showGlobalMessage({ message }));
  }

}
