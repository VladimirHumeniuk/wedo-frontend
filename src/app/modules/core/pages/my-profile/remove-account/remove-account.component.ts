import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'wd-remove-account',
  templateUrl: './remove-account.component.html',
  styleUrls: ['./remove-account.component.scss']
})
export class RemoveAccountComponent implements OnInit {

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent
  @Input() plan: string;

  public removeAccountForm: FormGroup;
  public loading: boolean;
  public holdTimer: boolean = false

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) { }

  private formInit(): void {
    this.removeAccountForm = this.formBuilder.group({
      removeAccountPasswordConfirm: ['', [
        Validators.required
      ]],
      approval: [false, [
        Validators.requiredTrue
      ]]
    })
  }

  public cancelTimer(): void {
    this.countdown.stop()
  }

  public handleTimerEvent(event: CountdownEvent): void {
    if (event.action === 'done') this.removeAccount()
  }

  public removeAccount(): void {
    if (this.removeAccountForm.valid) {
      this.loading = true

      const { removeAccountPasswordConfirm } = this.removeAccountForm.value

      this.authService.removeAccount(removeAccountPasswordConfirm)
        .then(() => {
          this.loading = false
        })
    }
  }

  ngOnInit(): void {
    this.formInit()
  }

}
