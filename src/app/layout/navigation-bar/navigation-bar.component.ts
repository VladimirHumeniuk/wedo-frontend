import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'wd-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  public signOut(): void {
    this.authService.signOut()
  }

  delete() {
    this.authService.deleteUser()
  }

  ngOnInit() {
  }

}
