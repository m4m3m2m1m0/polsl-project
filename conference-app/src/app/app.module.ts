import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser/';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserConferenceModule } from './cms-components/conference/user-conference.module';
import { HomepageModule } from './cms-components/homepage/homepage.module';
import { NavigationModule } from './cms-components/navigation/navigation.module';
import { OpenMapsModule } from './cms-components/open-maps/open-maps.module';
import { SignInUpModule } from './cms-components/sign-in-up/sign-in-up.module';
import { ConferenceService } from './occ/services/conference/conference.service';
import { NewsService } from './occ/services/news/news.service';
import { UserService } from './occ/services/user/user.service';
import { ConferenceModule } from './store/features/conference/conference.module';
import { GlobalMessageModule } from './store/features/global-message/global-message.module';
import { UserModule } from './store/features/user/user.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

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
    UserConferenceModule,
    GlobalMessageModule,
    UserModule,
    ConferenceModule,
    HomepageModule,
    // Store Modules //
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    UserService, ConferenceService, NewsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
