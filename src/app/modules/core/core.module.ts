import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CountdownModule } from 'ngx-countdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbLayoutModule,
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

// Layout components
import { LayoutComponent } from './layout/layout.component';
import { NavigationBarComponent } from './layout/navigation-bar/navigation-bar.component';
import { FooterComponent } from './layout/footer/footer.component';

// Components
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { CoreComponent } from './core.component';
import { LoginMethodsComponent } from './components/login-methods/login-methods.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CardsGridComponent } from './components/cards-grid/cards-grid.component';
import { CardComponent } from './components/card/card.component';
import { LocationMapComponent } from './components/location-map/location-map.component';
import { SocialShareComponent } from './components/social-share/social-share.component';
import { SocialButtonComponent } from './components/social-share/social-button/social-button.component';
import { PromptPasswordComponent } from './pages/prompt-password/prompt-password.component';

@NgModule({
  declarations: [
    AccountComponent,
    AuthFormComponent,
    CoreComponent,
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
    CardDetailsComponent,
    LocationMapComponent,
    SocialShareComponent,
    SocialButtonComponent,
    PromptPasswordComponent,
    LayoutComponent,
    NavigationBarComponent,
    FooterComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreRoutingModule,
    CountdownModule,
    CommonModule,
    FontAwesomeModule,
    LeafletModule,
    FormsModule,
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbLayoutModule,
    NbPopoverModule,
    NbSpinnerModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    AngularFirestore
  ]
})
export class CoreModule { }
