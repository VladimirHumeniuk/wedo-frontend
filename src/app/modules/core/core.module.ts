import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';

import {
  NbCardModule,
  NbIconModule,
  NbCheckboxModule,
  NbButtonModule,
  NbSpinnerModule
} from '@nebular/theme';

import { environment } from '../../../environments/environment';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { SharedModule } from '../../shared/shared.module';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    SignUpComponent,
    AuthFormComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserModule,
    CoreRoutingModule,
    NbCardModule,
    NbIconModule,
    NbCheckboxModule,
    NbButtonModule,
    NbSpinnerModule
   ],
  exports: [
    RouterModule
  ],
  providers: [
    AngularFirestore
  ]
})
export class CoreModule { }
