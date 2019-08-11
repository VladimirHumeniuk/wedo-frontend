import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserService } from './../../../../shared/services/user.service';
import { User } from './../../../../shared/models';
import { AppState } from './../../../../app.state';

@Component({
  selector: 'wd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User

  constructor(
    private store: Store<AppState>,
    private userService: UserService
  ) {
    this.userService.user$.subscribe((user: User) => {
      this.user = user
    })
  }

  ngOnInit() {
  }

}
