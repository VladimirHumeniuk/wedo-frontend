import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { isUser, isGuest } from './guards/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AccountComponent } from './pages/account/account.component';
import { RequestPasswordComponent } from './pages/request-password/request-password.component';
import { EmailVerifiedComponent } from './pages/email-verified/email-verified.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { InvalidActionCodeComponent } from './pages/invalid-action-code/invalid-action-code.component';
import { ResendVerificationEmailComponent } from './pages/resend-verification-email/resend-verification-email.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [isGuest]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [isGuest]
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: 'resend-verification-email',
    component: ResendVerificationEmailComponent,
    canActivate: [isUser]
  },
  {
    path: 'request-password',
    component: RequestPasswordComponent,
    canActivate: [isGuest]
  },
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'email-verified',
        component: EmailVerifiedComponent,
      },
      {
        path: 'invalid-action-code',
        component: InvalidActionCodeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [isGuest, isUser]
})
export class CoreRoutingModule { }
