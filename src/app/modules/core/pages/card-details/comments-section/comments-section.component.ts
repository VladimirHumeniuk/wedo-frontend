import { Component, Input, OnInit } from '@angular/core';
import { Comment, User } from 'src/app/shared/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SafeComponent } from 'src/app/shared/helpers';
import { takeUntil, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'wd-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent extends SafeComponent implements OnInit {

  @Input() comments: Comment[];
  @Input() cid: string;
  @Input() business: string;

  public user$: Observable<User> = this.store.select('user');
  public user: User;

  public loading: boolean;
  public feedbackForm: FormGroup;
  public length: number;

  constructor(
    private readonly store: Store<AppState>,
    private readonly formBuilder: FormBuilder
  ) {
    super();
  }

  private formInit(): void {
    this.feedbackForm = this.formBuilder.group({
      text: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)
      ]],
      feedbackRating: [0, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]]
    })
  }

  ngOnInit(): void {
    this.formInit()

    this.feedbackForm.controls['text'].valueChanges.pipe(
      takeUntil(this.unsubscriber),
      map(val => val.length)
    ).subscribe(length => this.length = length)

    this.user$.pipe(
      takeUntil(this.unsubscriber),
      tap(user => this.user = user)
    ).subscribe()
  }

}
