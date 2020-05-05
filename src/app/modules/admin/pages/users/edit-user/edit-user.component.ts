import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models';
import { EMAIL_REGEXP, ALERTS } from 'src/app/shared/constants';
import { UserService } from 'src/app/shared/services';
import { take, map, takeUntil, delay } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SafeComponent } from 'src/app/shared/helpers';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { AddAlert, RemoveAlert } from 'src/app/store/actions/alert.action';
import { GetAllUsers } from 'src/app/store/actions/user.action';

@Component({
  selector: 'wd-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends SafeComponent implements OnInit {

  public uid: string

  public editUserForm: FormGroup
  private emailRegexp: RegExp = EMAIL_REGEXP

  public loading: boolean

  accountTypes = ['Business', 'Freelancer']

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
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
      createdAt: [],
      acceptTermsAndConditions: [ false ],
      company: [''],
      roles: this.formBuilder.group({
        admin: [ false ],
        author: [ false ],
        readonly: [ false ]
      })
    })
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

  private updateAlertForVerificationEmail(emailVerified: boolean): void {
    if (!emailVerified) {
      this.store.dispatch(new AddAlert({ uid: this.uid, alert: ALERTS['email-not-verified']}))
    } else {
      this.store.dispatch(new RemoveAlert({ uid: this.uid, code: ALERTS['email-not-verified'].code}));
    }
  }

  public userDataToForm(user: User): void {
    this.uid = user.uid
    let date: Date

    if (user.createdAt && '_seconds' in user.createdAt) {
      date = new Date(user.createdAt._seconds * 1000)
    }

    Object.keys(user).forEach((key: string) => {
      if (this.editUserForm.controls[key]) {

        switch (key) {
          case 'roles':
            const rolesForm = this.editUserForm.controls.roles
            Object.keys(user[key]).forEach((role: string) => {
              if (rolesForm['controls'][role]) {
                rolesForm['controls'][role].setValue(user[key][role])
              }
            })
            break;

          case 'createdAt':
            this.editUserForm.controls['createdAt'].setValue(date);
            break;

          default:
            this.editUserForm.controls[key].setValue(user[key]);
            break;
        }
      }
    })
  }

  ngOnInit() {
    this.formInit();
    this.activatedRoute.queryParams
      .pipe(
        delay(0),
        take(1),
        takeUntil(this.unsubscriber)
      )
      .subscribe((data: Params) => {

        this.store.select('admin').pipe(
          map((state) => {
            const userFromState = state.users.filter(user => user.uid === data.id)
            let user = Object.assign({}, userFromState[0])
            return user
          })
        ).subscribe((user: User) => {
          if (user.uid) {
            this.userDataToForm(user)
          } else {
            this.userService.getUser(data.id).pipe(
              take(1),
              takeUntil(this.unsubscriber)
            ).subscribe((user: User) => {
              this.userDataToForm(user)
            })
          }
        })
    })
  }

}
