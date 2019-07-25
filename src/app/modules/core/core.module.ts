import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbCardModule,
  NbInputModule
} from '@nebular/theme';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { SharedModule } from '../../shared/shared.module';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { InputGroupComponent } from './components/input-group/input-group.component';

@NgModule({
  declarations: [
    HomeComponent,
    SignUpComponent,
    AuthFormComponent,
    InputGroupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserModule,
    CoreRoutingModule,
    NbCardModule,
    NbInputModule
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class CoreModule { }
