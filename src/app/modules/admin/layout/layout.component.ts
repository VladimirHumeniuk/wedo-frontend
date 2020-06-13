import { Component, OnInit } from '@angular/core';
import { tap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserService } from '../../../shared/services';
import { AppState } from '../../../app.state';
import { GetUser } from '../../../store/actions/user.action';
import { SafeComponent } from '../../../shared/helpers';

@Component({
  selector: 'wd-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends SafeComponent implements OnInit {

  public loading: boolean;

  constructor(
    private readonly store: Store<AppState>,
    private readonly userService: UserService,
  ) {
    super();

    this.userService.user$.pipe(
      takeUntil(this.unsubscriber),
      tap((x: any) => this.loading = x.loading === true)
    ).subscribe();
  }

  ngOnInit() {
    this.store.dispatch(new GetUser());
  }
}
