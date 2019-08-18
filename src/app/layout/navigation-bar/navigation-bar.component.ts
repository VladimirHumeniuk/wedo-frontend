import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from 'src/app/shared/services';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'wd-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  public user: User

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fireAuth: AngularFireAuth
  ) {
    this.userService.user$.subscribe((user: User) => {
      this.user = user
    })
  }

  public signOut(): void {
    this.authService.signOut()
  }

  delete() {
    this.authService.deleteUser()
  }

  ngOnInit() {
  }

}
