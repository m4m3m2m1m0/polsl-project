import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GlobalMessageEffects } from './global-message-store/global-message.effects';
import { globalMessageReducer } from './global-message-store/global-message.reducers';
import { GlobalMessageFacade } from './facades/global-message.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('globalMessage', globalMessageReducer),
    EffectsModule.forFeature([GlobalMessageEffects])
  ],
  providers: [GlobalMessageFacade]
})
export class GlobalMessageModule { }
