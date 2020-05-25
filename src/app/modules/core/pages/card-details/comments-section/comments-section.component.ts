import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Comment, User } from 'src/app/shared/models';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { SafeComponent } from 'src/app/shared/helpers';
import { Observable, Subscription } from 'rxjs';
import { takeUntil, map, tap, take } from 'rxjs/operators';
import { NbPopoverDirective } from '@nebular/theme';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { firestore } from 'firebase/app';
import { RatingService, CountersService } from 'src/app/shared/services';
import { DatePipe } from '@angular/common';
import { CommentService } from 'src/app/shared/services/comment.service';

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

  public comments: Comment[] = [];
  public user$: Observable<User> = this.store.select('user');
  public user: User;
  public uid: string;

  public loading: string | boolean;
  public length: number;

  public feedbackForm: FormGroup;
  public answerForm: FormGroup;

  public isCommented: boolean;

  public inAnswer: string;
  public inEdit: string;

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

  private feedbackFormInit(): void {
    this.feedbackForm = this.formBuilder.group({
      text: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)
      ]],
      star: [0, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]]
    })
  }

  private answerFormInit(): void {
    this.answerForm = this.formBuilder.group({
      text: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)
      ]]
    })
  }

  private saveComment(companyId: string, comment: Comment): Promise<any> {
    return comment.id
      ? this.commentService.setComment(companyId, comment).toPromise()
      : this.commentService.addComment(companyId, comment).toPromise();
  }

  private recountStars(): Subscription {
    return this.ratingService.getCompanyStars(this.cid)
    .pipe(
      takeUntil(this.unsubscriber),
      take(1),
      map(arr => {
        const ratings = arr.map(v => v.value)
        return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 0
      }),
      tap(val => {
        this.fireStore.collection('companies').doc(this.cid).set({
          rating: val
        }, { merge: true })
      })
    ).subscribe()
  }

  public postFeedbackVote(id: string, vote: boolean): void {
    this.loading = id

    this.fireStore.collection('companies')
      .doc(this.cid)
      .collection('comments')
      .doc(id)
      .collection('votes')
      .doc(this.uid)
      .set({ value: vote })
      .then(() => this.loading = null)
  }

  public getDateTitle(date: any, isEdited: boolean): string {
    return `${this.datePipe.transform(new Date(date._seconds * 1000), 'd MMMM, y, hh:mm a')} ${isEdited ? '\u00a0(edited)' : ''}`
  }

  public postAnswer(id: string, hasAnswer: any): void {
    if (this.answerForm.valid) {
      this.loading = id
      const { text } = this.answerForm.value

      const answer: Comment = {
        text: text,
        isEdited: !!hasAnswer
      }

      if (!hasAnswer) answer['date'] = firestore.FieldValue.serverTimestamp()

      this.fireStore.collection('companies')
      .doc(this.cid)
      .collection('comments')
      .doc(id)
      .set({
        answer: answer
      }, { merge: true })
      .then(() => {
        this.loading = null
        this.answerForm.reset()
      })
      .finally(() => {
        this.inAnswer = null
      })
    }
  }

  public postFeedback(id?: string): void {
    if (this.feedbackForm.valid) {
      this.loading = id ? id : true

      const { uid, username } = this.user
      const { text, star } = this.feedbackForm.value

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

      const promises = [
        this.saveComment(this.cid, comment)
      ];

      const starsRef = this.fireStore.collection('counters').doc('stars').collection('companies').doc(this.cid).ref

      if (!this.comments || this.comments.length === 0) {
        promises.push(
          this.countersService.createCounter(
            starsRef,
            5
          )
        )
      }

      Promise.all(promises).then(() => {
        this.ratingService.setStar(uid, this.cid, star).toPromise()
          .then(() => {
            this.recountStars()
          }).then(() => {
            if (!id) this.countersService.updateCounter(starsRef, 5, 'inc')
          }).finally(() => {
            this.loading = null
            if (this.inEdit) this.inEdit = null
          })
      })
    }
  }

  public deleteComment(id: string, author: string): void {
    const starsRef = this.fireStore.collection('counters').doc('stars').collection('companies').doc(this.cid).ref

    this.fireStore.collection('companies').doc(this.cid).collection('comments').doc(id).delete().then(() => {
      this.fireStore.collection('stars').doc(`${author}_${this.cid}`).delete().then(() => {
        this.countersService.updateCounter(starsRef, 5, 'dec')
        this.recountStars()
      })
    })
  }

  public deleteAnswer(id: string): Promise<void> {
    return this.fireStore.collection('companies')
      .doc(this.cid)
      .collection('comments')
      .doc(id)
      .set({ answer: null }, {
        merge: true
      })
  }

  public toggleEdit(event: Event, text?: string, star?: number, author?: string): void {
    event.preventDefault()

    if (!author) this.inEdit = null

    const isAuthor = author === this.uid

    if (!this.inEdit && isAuthor) {
      setTimeout(() => {
        this.editCommentTextarea.nativeElement.focus();
      }, 100)

      this.feedbackForm.controls['text'].setValue(text)
      this.feedbackForm.controls['star'].setValue(star)
    }

    isAuthor ? this.inEdit = author : null
  }

  public toggleAnswer(event: Event, id?: string, text?: string): void {
    event.preventDefault()

    this.inAnswer = id ? id : null

    if (this.inAnswer) {
      setTimeout(() => {
        this.editAnswerTextarea.nativeElement.focus();
      }, 100)

      if (text) this.answerForm.controls['text'].setValue(text)
    }
  }

  public closePopover(): void {
    this.popover.hide()
  }

  ngOnInit(): void {
    this.feedbackFormInit()
    this.answerFormInit()

    this.user$.pipe(
      takeUntil(this.unsubscriber),
      tap(user => {
        this.user = user
        this.uid = user.uid

        if (user.accountType === 'personal') {
          this.feedbackForm.controls['text'].valueChanges.pipe(
            takeUntil(this.unsubscriber),
            map(val => val ? val.length : val)
          ).subscribe(length => this.length = length)
        }

        if (user.accountType === 'business' && this.cid === user.company) {
          this.answerForm.controls['text'].valueChanges.pipe(
            takeUntil(this.unsubscriber),
            map(val => val ? val.length : val)
          ).subscribe(length => this.length = length)
        }
      })
      ).subscribe()

      this.feedbackFormInit()

    this.commentService.getCompanyComments(this.cid).pipe(
      takeUntil(this.unsubscriber),
      tap(comments => {
        if (this.user.accountType === 'personal') {
          this.isCommented = !!comments.find(comment => comment.author.uid === this.uid)
        }
        this.comments = comments
      })
    ).subscribe();
  }

}
