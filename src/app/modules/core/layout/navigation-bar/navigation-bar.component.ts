import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from 'src/app/shared/services';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'wd-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  animations: [
    trigger('toggleNav', [
      state('out', style({
        opacity: 0,
        pointerEvents: 'none',
      })),
      state('in', style({
        opacity: 1,
        pointerEvents: 'auto',
      })),
      transition('out => in', [
        animate('0.1s ease-in')
      ]),
      transition('in => out', [
        animate('0.1s ease-out')
      ]),
    ])
  ]
})
export class NavigationBarComponent implements OnInit {

  public user: User
  public isNavToggled: boolean

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly fireAuth: AngularFireAuth
  ) {
    this.userService.user$.subscribe((user: User) => {
      this.user = user
    })
  }

  public toggleMenu(): void {
    this.isNavToggled = !this.isNavToggled
  }

  public signOut(): void {
    this.authService.signOut()
  }

  ngOnInit() { }

}
