import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CountdownModule } from 'ngx-countdown';

import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbToastrModule,
  NbIconModule,
  NbSpinnerModule
} from '@nebular/theme';

// Environments
import { environment } from '../../../environments/environment';

// Modules
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Pages
import { AccountComponent } from './pages/account/account.component';
import { EmailVerifiedComponent } from './pages/email-verified/email-verified.component';
import { HomeComponent } from './pages/home/home.component';
import { InvalidActionCodeComponent } from './pages/invalid-action-code/invalid-action-code.component';
import { RequestPasswordComponent } from './pages/request-password/request-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { MyCompanyCardComponent } from './pages/my-company-card/my-company-card.component';
import { CardDetailsComponent } from './pages/card-details/card-details.component';

// Components
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { LoginMethodsComponent } from './components/login-methods/login-methods.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CardsGridComponent } from './components/cards-grid/cards-grid.component';
import { CardComponent } from './components/card/card.component';


const toastrConfig = {
  duration: 4000,
}

@NgModule({
  declarations: [
    AccountComponent,
    AuthFormComponent,
    EmailVerifiedComponent,
    HomeComponent,
    InvalidActionCodeComponent,
    LoginMethodsComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    MyCompanyCardComponent,
    SearchBarComponent,
    CardsGridComponent,
    CardComponent,
    CardDetailsComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    BrowserAnimationsModule,
    CoreRoutingModule,
    CountdownModule,
    FormsModule,
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbToastrModule.forRoot(toastrConfig),
    NbSpinnerModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    AngularFirestore
  ]
})
export class CoreModule { }
