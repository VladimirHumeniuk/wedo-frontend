import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CanDeactivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AuthService } from 'src/app/shared/services';
import { FORMS_MESSAGES } from 'src/app/shared/constants';
import * as LoginActions from 'src/app/store/actions/login.action';
import { Login } from 'src/app/shared/models';
import { take } from 'rxjs/operators'

@Component({
  selector: 'wd-prompt-password',
  templateUrl: './prompt-password.component.html',
  styleUrls: ['./prompt-password.component.scss']
})
export class PromptPasswordComponent implements OnInit, OnDestroy {

  public promptPasswordForm: FormGroup
  public loading: boolean

  public credentials: Login

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<AppState>
  ) { }

  private formInit(): void {
    this.promptPasswordForm = this.formBuilder.group({
      password: ['', [
        Validators.required
      ]]
    })
  }

  public sendCredentials(): void {
    this.loading = true

    if (this.promptPasswordForm.invalid) {
      this.loading = false
    }

    if (this.promptPasswordForm.valid) {
      const { email, credential } = this.credentials

      const formData = {
        ...this.promptPasswordForm.value,
        email: email
      }

      this.authService.signInWithEmailAndPassword(formData, credential)
        .then(() => {
          this.promptPasswordForm.reset()
        })
        .finally(() => {
          this.loading = false
        })
    }

  }

  ngOnDestroy() {
    this.store.dispatch(new LoginActions.AbortLogin())
  }

  ngOnInit() {
    this.formInit()

    this.store.select('login').pipe(
      take(1)
    ).subscribe((credentials: Login) => {
      this.credentials = credentials
    })
  }

}
