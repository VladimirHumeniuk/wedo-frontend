import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CanDeactivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AuthService } from 'src/app/shared/services';
import { FORMS_MESSAGES } from 'src/app/shared/constants';
import * as LoginActions from 'src/app/store/actions/login.action';

@Component({
  selector: 'wd-prompt-password',
  templateUrl: './prompt-password.component.html',
  styleUrls: ['./prompt-password.component.scss']
})
export class PromptPasswordComponent implements OnInit {

  public promptPasswordForm: FormGroup
  public loading: boolean

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

  canDeactivate() {
    this.store.dispatch(new LoginActions.AbortLogin())
  }

  ngOnInit() {
    this.formInit()
  }

}
