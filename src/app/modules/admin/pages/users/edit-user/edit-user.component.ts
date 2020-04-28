import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models';
import { EMAIL_REGEXP } from 'src/app/shared/constants';
import { UserService } from 'src/app/shared/services';
import { take } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'wd-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  private _queryParams: Subscription
  public user: User

  public editUserForm: FormGroup
  private emailRegexp: RegExp = EMAIL_REGEXP

  public loading: boolean

  accountTypes = ['business', 'freelancer']

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService
  ) { }

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
      company: ['']
    })
  }

  ngOnDestroy() {
    this._queryParams.unsubscribe()
  }

  ngOnInit() {
    this.formInit()

    this._queryParams = this.activatedRoute.queryParams.subscribe((data: Params) => {
      this.userService.getUser(data.uid).pipe(
        take(1)
      ).subscribe((user: User) => {
        this.user = user

        if (user) {
          Object.keys(user).forEach((key: string) => {
            if (this.editUserForm.controls[key]) {
              this.editUserForm.controls[key].setValue(user[key])
            }
          })
        }
      })
    })
  }

}
