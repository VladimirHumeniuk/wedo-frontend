import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    CoreRoutingModule
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class CoreModule { }
