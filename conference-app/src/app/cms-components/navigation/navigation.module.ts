import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavMenuComponent, SideMenuComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavMenuComponent, SideMenuComponent],
  entryComponents: [NavMenuComponent, SideMenuComponent]
})
export class NavigationModule { }
