import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AccountComponent } from './pages/account/account.component';
import { RequestPasswordComponent } from './pages/request-password/request-password.component';
import { EmailVerifiedComponent } from './pages/email-verified/email-verified.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

import { UserResolver } from 'src/app/shared/resolvers/user.resolver'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: 'request-password',
    component: RequestPasswordComponent
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
        resolve: { data: UserResolver },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserResolver]
})
export class CoreRoutingModule { }
