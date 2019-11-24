import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser/';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './cms-components/navigation/navigation.module';
import { SignInUpModule } from './cms-components/sign-in-up/sign-in-up.module';
import { GlobalMessageModule } from './store/features/global-message/global-message.module';
import { UserModule } from './store/features/user/user.module';
import { CommonModule } from '@angular/common';
import { UserService } from './occ/services/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { OpenMapsModule } from './cms-components/open-maps/open-maps.module';
import { ConferenceService } from './occ/services/conference/conference.service';
import { ConferenceModule } from './store/features/conference/conference.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SignInUpModule,
    NavigationModule,
    HttpClientModule,
    OpenMapsModule,
    // Store Modules //
    GlobalMessageModule,
    UserModule,
    ConferenceModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [UserService, ConferenceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
