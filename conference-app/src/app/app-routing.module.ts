import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConferenceDetailsComponent } from './cms-components/conference/conference-details/conference-details.component';
import { ConferenceListComponent } from './cms-components/conference/conference-list/conference-list.component';
import { MyConferenceListComponent } from './cms-components/conference/my-conference-list/my-conference-list.component';
import { HomepageComponent } from './cms-components/homepage/homepage/homepage.component';
import { OpenMapsComponent } from './cms-components/open-maps/open-maps/open-maps.component';
import { LoginComponent } from './cms-components/sign-in-up/login/login.component';
import { RegisterComponent } from './cms-components/sign-in-up/register/register.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'conference-map', component: OpenMapsComponent },
  { path: 'my-conferences', component: MyConferenceListComponent },
  { path: 'conference/:id', component: ConferenceDetailsComponent },
  { path: 'conferences', component: ConferenceListComponent },
  { path: 'account-details', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
