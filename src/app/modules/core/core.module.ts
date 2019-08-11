import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';

import { CountdownModule } from 'ngx-countdown';

import {
  NbCardModule,
  NbIconModule,
  NbCheckboxModule,
  NbButtonModule,
  NbSpinnerModule,
  NbAlertModule
} from '@nebular/theme';

import { environment } from '../../../environments/environment';

import { SharedModule } from '../../shared/shared.module';

import { CoreRoutingModule } from './core-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AccountComponent } from './pages/account/account.component';
import { EmailVerifiedComponent } from './pages/email-verified/email-verified.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RequestPasswordComponent } from './pages/request-password/request-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { InvalidActionCodeComponent } from './pages/invalid-action-code/invalid-action-code.component';

import { LoginMethodsComponent } from './components/login-methods/login-methods.component';

import { userReducer } from '../../reducers';

@NgModule({
  declarations: [
    HomeComponent,
    SignUpComponent,
    AuthFormComponent,
    SignInComponent,
    LoginMethodsComponent,
    AccountComponent,
    EmailVerifiedComponent,
    ResetPasswordComponent,
    RequestPasswordComponent,
    VerifyEmailComponent,
    InvalidActionCodeComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    CountdownModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserModule,
    CoreRoutingModule,
    NbCardModule,
    NbIconModule,
    NbCheckboxModule,
    NbButtonModule,
    NbSpinnerModule,
    NbAlertModule,
    StoreModule.forRoot({
      user: userReducer
    })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AngularFirestore
  ]
})
export class CoreModule { }
