import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './../../../../shared/models';
import { AppState } from './../../../../app.state';

@Component({
  selector: 'wd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: Observable<User>

  constructor(
    private store: Store<AppState>
  ) {
    this.user = store.select('user')
  }

  ngOnInit() {
  }

}
