import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalMessageModule } from './store/features/global-message/global-message.module';
import { SignInUpModule } from './cms-components/sign-in-up/sign-in-up.module';
import { UserModule } from './store/features/user/user.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignInUpModule,
    // Store Modules //
    GlobalMessageModule,
    UserModule,
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
