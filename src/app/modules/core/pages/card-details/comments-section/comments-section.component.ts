import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Comment, User } from 'src/app/shared/models';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { SafeComponent } from 'src/app/shared/helpers';
import { Observable, Subscription } from 'rxjs';
import { takeUntil, map, tap, take, filter } from 'rxjs/operators';
import { NbPopoverDirective } from '@nebular/theme';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { firestore } from 'firebase/app';
import { RatingService, CountersService } from 'src/app/shared/services';
import { DatePipe } from '@angular/common';
import { CommentService } from 'src/app/shared/services/comment.service';
import { Loader } from 'src/app/shared/helpers/loader';
import {
  GetAllCompanyComments,
  ADD_COMPANY_COMMENT,
  UPDATE_COMPANY_COMMENT,
  REMOVE_COMPANY_COMMENT,
  UpdateCompanyComment,
  AddCompanyComment,
  RemoveCompanyComment,
  ApplyOrderToCompanyComments
} from 'src/app/store/actions/comment.action';
import { RecalculateCompanyRating } from 'src/app/store/actions/rating.action';
import { QueryPayloadInput } from 'src/app/shared/models/query/query-payload.model';
import { selectCommentFeatureQuery } from 'src/app/store/states/comment.state';

type Dictionary<T extends string | symbol | number, U> = {
    [K in T]?: U;
};

@Component({
  selector: 'wd-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent extends SafeComponent implements OnInit {
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  @ViewChild('editCommentTextarea') editCommentTextarea: any;
  @ViewChild('editAnswerTextarea') editAnswerTextarea: any;

  @ViewChild('editFeedbackForm') editFeedbackForm: FormGroupDirective;
  @ViewChild('editAnswerForm') editAnswerForm: FormGroupDirective;

  @Input() cid: string;
  @Input() business: string;

  public sortingOptions: string[] = [
    'Date',
    'Rating (descending)',
    'Rating (ascending)'
  ];
  public loader: Loader = Loader.instance;
  public comments: Comment[] = [];
  public user$: Observable<User> = this.store.select('user');
  public commentsQuery$: Observable<QueryPayloadInput> = this.store.select(selectCommentFeatureQuery);
  public user: User;
  public uid: string;
  public loading: string | boolean;
  public length: number;
  public feedbackForm: FormGroup;
  public answerForm: FormGroup;
  public sortingForm: FormGroup;
  public isCommented: boolean;
  public votedForFeedback: string[] = [];
  public inAnswer: string;
  public inEdit: string;

  ADD_COMPANY_COMMENT = ADD_COMPANY_COMMENT;
  UPDATE_COMPANY_COMMENT = UPDATE_COMPANY_COMMENT;
  REMOVE_COMPANY_COMMENT = REMOVE_COMPANY_COMMENT;

  constructor(
    private readonly store: Store<AppState>,
    private readonly datePipe: DatePipe,
    private readonly formBuilder: FormBuilder,
    private readonly fireStore: AngularFirestore,
    private readonly ratingService: RatingService,
    private readonly countersService: CountersService,
    private readonly commentService: CommentService
  ) {
    super();
  }

  ngOnInit(): void {
    this.sortingFormInit();
    this.feedbackFormInit();
    this.answerFormInit();

    this.commentsQuery$
        .pipe(
            takeUntil(this.unsubscriber),
            take(1),
            tap(query => this.sortingFormInit(query?.order?.selectedRaw))
        ).subscribe();

    this.sortingForm.controls.sort.valueChanges.pipe(
        takeUntil(this.unsubscriber),
        tap(value => this.sortChange(value))
    ).subscribe();

    this.user$
      .pipe(
        takeUntil(this.unsubscriber),
        tap(user => {
          this.user = user;
          this.uid = user.uid;

          if (user.accountType === 'personal') {
            this.feedbackForm.controls['text'].valueChanges
              .pipe(
                takeUntil(this.unsubscriber),
                map(val => (val ? val.length : val))
              )
              .subscribe(length => (this.length = length));
          }

          if (user.accountType === 'business' && this.cid === user.company) {
            this.answerForm.controls['text'].valueChanges
              .pipe(
                takeUntil(this.unsubscriber),
                map(val => (val ? val.length : val))
              )
              .subscribe(length => (this.length = length));
          }
        })
      )
      .subscribe();

    this.feedbackFormInit();

    this.commentService.comments$
      .pipe(
        takeUntil(this.unsubscriber),
        tap(comments => {
          if (this.user.accountType === 'personal') {
            this.isCommented = !!comments.find(
              comment => comment.author.uid === this.uid
            );
          }
          this.comments = comments;
        })
      )
      .subscribe();

    this.store.dispatch(new GetAllCompanyComments({ companyId: this.cid }));
  }

  private feedbackFormInit(): void {
    this.feedbackForm = this.formBuilder.group({
      text: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500)
        ]
      ],
      star: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  private answerFormInit(): void {
    this.answerForm = this.formBuilder.group({
      text: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500)
        ]
      ]
    });
  }

  private sortingFormInit(initValue: string = 'Date' ): void {
    this.sortingForm = this.formBuilder.group({
      sort: [initValue]
    })
  }

  private saveComment(companyId: string, comment: Comment) {
    return comment.id
      ? this.store.dispatch(new UpdateCompanyComment({ companyId, comment }))
      : this.store.dispatch(new AddCompanyComment({ companyId, comment }));
  }

  private recountStars() {
    this.store.dispatch(new RecalculateCompanyRating({companyId: this.cid}));
  }

  public postFeedbackVote(id: string, vote: boolean): void {
    this.loading = id;

    this.fireStore
      .collection('companies')
      .doc(this.cid)
      .collection('comments')
      .doc(id)
      .collection('votes')
      .doc(this.uid)
      .set({ value: vote }, { merge: true })
      .then(() => {
        this.votedForFeedback.push(id);
        this.loading = null
      });
  }

  public getDateTitle(date: any, isEdited: boolean): string {
    if (!date || !date._seconds) {
      return 'Now';
    }

    return `${this.datePipe.transform(
      new Date(date._seconds * 1000),
      'd MMMM, y, hh:mm a'
    )} ${isEdited ? '\u00a0(edited)' : ''}`;
  }

  public postAnswer(id: string, hasAnswer: any): void {
    if (this.answerForm.valid) {
      this.loading = id;
      const { text } = this.answerForm.value;

      const answer: Comment = {
        text: text,
        isEdited: !!hasAnswer
      };

      if (!hasAnswer) answer['date'] = firestore.FieldValue.serverTimestamp();

      this.fireStore
        .collection('companies')
        .doc(this.cid)
        .collection('comments')
        .doc(id)
        .set(
          {
            answer: answer
          },
          { merge: true }
        )
        .then(() => {
          this.loading = null;
          this.store.dispatch(new GetAllCompanyComments({ companyId: this.cid }));
          this.answerForm.reset();
        })
        .finally(() => {
          this.inAnswer = null;
        });
    }
  }

  public postFeedback(id?: string): void {
    if (this.feedbackForm.valid) {
      this.loading = id ? id : true;

      const { uid, username } = this.user;
      const { text, star } = this.feedbackForm.value;

      const comment: Comment = {
        id,
        author: {
          uid,
          username
        },
        text,
        isEdited: this.isCommented,
        rating: star
      };

      this.saveComment(this.cid, comment);
      const promises = [];

      const starsRef = this.fireStore
        .collection('counters')
        .doc('stars')
        .collection('companies')
        .doc(this.cid).ref;

      if (!this.comments || this.comments.length === 0) {
        promises.push(this.countersService.createCounter(starsRef, 5));
      }

      Promise.all(promises).then(() => {
        this.ratingService
          .setStar(uid, this.cid, star)
          .toPromise()
          .then(() => {
            this.recountStars();
          })
          .then(() => {
            if (!id) this.countersService.updateCounter(starsRef, 5, 1);
          })
          .finally(() => {
            this.loading = null;
            if (this.inEdit) this.inEdit = null;
          });
      });
    }
  }

  public deleteComment(id: string, author: string): void {
    this.popover.hide();
    const starsRef = this.fireStore
      .collection('counters')
      .doc('stars')
      .collection('companies')
      .doc(this.cid).ref;
    this.fireStore
      .collection('stars')
      .doc(`${author}_${this.cid}`)
      .delete()
      .then(() => {
        this.store.dispatch(
          new RemoveCompanyComment({ companyId: this.cid, commentId: id })
        );
        this.countersService.updateCounter(starsRef, 5, -1);
        this.recountStars();
      });
  }

  public deleteAnswer(id: string): Promise<void> {
    return this.fireStore
      .collection('companies')
      .doc(this.cid)
      .collection('comments')
      .doc(id)
      .set(
        { answer: null },
        { merge: true }
      ).then(() => {
        this.store.dispatch(new GetAllCompanyComments({ companyId: this.cid }));
      });
  }

  public toggleEdit(
    event: Event,
    text?: string,
    star?: number,
    author?: string
  ): void {
    event.preventDefault();

    if (!author) this.inEdit = null;

    const isAuthor = author === this.uid;

    if (!this.inEdit && isAuthor) {
      setTimeout(() => {
        this.editCommentTextarea.nativeElement.focus();
      }, 100);

      this.feedbackForm.controls['text'].setValue(text);
      this.feedbackForm.controls['star'].setValue(star);
    }

    isAuthor ? (this.inEdit = author) : null;
  }

  public toggleAnswer(event: Event, id?: string, text?: string): void {
    event.preventDefault();

    this.inAnswer = id ? id : null;

    if (this.inAnswer) {
      setTimeout(() => {
        this.editAnswerTextarea.nativeElement.focus();
      }, 100);

      if (text) this.answerForm.controls['text'].setValue(text);
    }
  }

  public closePopover(): void {
    this.popover.hide();
  }

  public sortChange(value: string) {
    type OrderingValues = 'Rating (descending)'| 'Rating (ascending)' | 'Date';
    const queries: Dictionary<OrderingValues, QueryPayloadInput> = {
        'Rating (descending)' : { order: { direction: 'desc', fieldName: 'rating', selectedRaw: 'Rating (descending)' } },
        'Rating (ascending)' : { order: { direction: 'asc', fieldName: 'rating', selectedRaw: 'Rating (ascending)' } },
        'Date' : { order: { direction: 'desc', fieldName: 'date', selectedRaw: 'Date' } },
    };

    this.store.dispatch(new ApplyOrderToCompanyComments({companyId: this.cid, query: queries[value]}));
  }
}
