import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { SharedModule } from '../../shared/shared.module';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
  declarations: [
    HomeComponent,
    SignUpComponent
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
