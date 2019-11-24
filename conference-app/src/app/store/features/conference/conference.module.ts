import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { conferenceReducer } from './conference-store/conference.reducers';
import { ConferenceFacade } from './facades/conference.facade';
import { ConferenceEffects } from './conference-store/conference.effects';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      StoreModule.forRoot({}),
      StoreModule.forFeature('conference', conferenceReducer),
      EffectsModule.forFeature([ConferenceEffects])
    ],
    providers: [ConferenceFacade]
  })
  export class ConferenceModule { }
  