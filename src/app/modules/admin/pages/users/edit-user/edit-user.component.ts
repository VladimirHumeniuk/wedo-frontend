import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models';
import { EMAIL_REGEXP, ALERTS } from 'src/app/shared/constants';
import { UserService } from 'src/app/shared/services';
import { take, map, tap, distinctUntilChanged, debounce, debounceTime, takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import {SafeComponent} from 'src/app/shared/helpers';
import {AppState} from 'src/app/app.state';
import {Store} from '@ngrx/store';
import {AddAlert, RemoveAlert} from 'src/app/store/actions/alert.action';
import {GetAllUsers} from 'src/app/store/actions/user.action';

@Component({
  selector: 'wd-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends SafeComponent implements OnInit, OnDestroy {

  private _queryParams: Subscription
  public user: User

  public editUserForm: FormGroup
  private emailRegexp: RegExp = EMAIL_REGEXP

  public loading: boolean

  accountTypes = ['Business', 'Freelancer']

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly location: Location,
    private readonly toastrService: NbToastrService,
    private readonly store: Store<AppState>,
  ) {
    super();
   }

  private formInit(): void {
    this.editUserForm = this.formBuilder.group({
      uid: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.pattern(this.emailRegexp),
        Validators.email,
      ]],
      emailVerified: [ false ],
      accountType: ['', [
        Validators.required
      ]],
      createdAt: [''],
      acceptTermsAndConditions: [ false ],
      company: [''],
      roles: this.formBuilder.group({
        admin: [ false ],
        author: [ false ],
        readonly: [ false ]
      })
    })
  }

  public goBack($event: Event): void {
    $event.preventDefault()
    this.location.back();
  }

  public saveUser(): boolean {
    this.loading = true

    if (this.editUserForm.invalid) {
      this.loading = false
    }

    if (this.editUserForm.valid) {
      const formData = this.editUserForm.value;

      this.updateAlertForVerificationEmail(this.editUserForm.get('emailVerified').value);

      this.userService.setUserData(formData)
        .then(() => {
          if (!this.editUserForm.get('company').pristine && this.editUserForm.get('company').touched) {
            this.userService.assignCompany(formData.uid, formData.company)
          }

          this.toastrService.success('Successfully saved', 'Saved');
        })
        .then(() => {
          this.store.dispatch(new GetAllUsers());
        })
        .catch(error => {
          throw Error(error)
        })
        .finally(() => {
          this.loading = false
          this.editUserForm.markAsPristine()
        })
    }

    return
  }

  updateAlertForVerificationEmail(emailVerified) {
    emailVerified === false
        ? this.store.dispatch(new AddAlert({ uid: this.user.uid, alert: ALERTS['email-not-verified']}))
        : this.store.dispatch(new RemoveAlert({ uid: this.user.uid, code: 'email-not-verified'}));
  }

  ngOnDestroy() {
    this._queryParams.unsubscribe()
  }

  ngOnInit() {
    this.formInit();

    this._queryParams = this.activatedRoute.queryParams.subscribe((data: Params) => {
      this.userService.getUser(data.uid).pipe(
        take(1),
        map((data: User) => {
          let user = Object.assign({}, data)

          if ('_seconds' in user.createdAt) {
            user.createdAt = new Date(user.createdAt._seconds * 1000)
          }

          return user
        })
      ).subscribe((user: User) => {
        this.user = user

        if (user) {
          Object.keys(user).forEach((key: string) => {
            if (this.editUserForm.controls[key] && key !== 'roles') {
              this.editUserForm.controls[key].setValue(user[key])
            }

            if (key === 'roles') {
              const rolesForm = this.editUserForm.controls.roles
              Object.keys(user[key]).forEach((role: string) => {
                if (rolesForm['controls'][role]) {
                  rolesForm['controls'][role].setValue(user[key][role])
                }
              })
            }
          })
        }
      })
    })
  }

}
