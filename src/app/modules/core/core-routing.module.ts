import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsUser, IsGuest, LoginGuard } from './guards';

import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AccountComponent } from './pages/account/account.component';
import { RequestPasswordComponent } from './pages/request-password/request-password.component';
import { EmailVerifiedComponent } from './pages/email-verified/email-verified.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { InvalidActionCodeComponent } from './pages/invalid-action-code/invalid-action-code.component';
import { MyCompanyCardComponent } from './pages/my-company-card/my-company-card.component';
import { CardDetailsComponent } from './pages/card-details/card-details.component';
import { PromptPasswordComponent } from './pages/prompt-password/prompt-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [IsGuest]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [IsGuest]
  },
  {
    path: 'prompt-password',
    component: PromptPasswordComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: 'request-password',
    component: RequestPasswordComponent,
    canActivate: [IsGuest]
  },
  {
    path: 'card/:cid',
    component: CardDetailsComponent
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
  },
  {
    path: 'my-company-card',
    component: MyCompanyCardComponent,
    canActivate: [IsUser]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [IsGuest, IsUser, LoginGuard]
})
export class CoreRoutingModule { }
