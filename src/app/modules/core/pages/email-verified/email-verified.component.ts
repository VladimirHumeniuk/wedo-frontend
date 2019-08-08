import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from 'src/app/shared/services';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'wd-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.scss']
})
export class EmailVerifiedComponent implements OnInit {

  public user: User
  public emailVerified: boolean
  public tokenExpired: boolean

  private oobCode: string

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.oobCode = params.oobCode
    })
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((routeData: Observable<firebase.User>) => {
      let data = routeData['data']

      if (data) {
        this.user = data
      }
    })

    if (this.user) {
      this.authService.verifyEmail(this.oobCode, this.user.uid)
      .then(() => {
        this.emailVerified = true
      })
      .catch(error => {
        this.tokenExpired = true
        throw new Error(error)
      })
    } else {
      this.tokenExpired = true
    }
  }

}
