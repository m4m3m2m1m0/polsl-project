import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './cms-components/sign-in-up/login/login.component';
import { RegisterComponent } from './cms-components/sign-in-up/register/register.component';
import { OpenMapsComponent } from './cms-components/open-maps/open-maps/open-maps.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'conference-map', component: OpenMapsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
