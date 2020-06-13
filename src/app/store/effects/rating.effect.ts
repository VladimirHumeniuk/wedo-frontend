import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, catchError, switchMap } from 'rxjs/operators';
import { CategoriesService, RatingService } from 'src/app/shared/services';
import { RECALCULATE_COMPANY_RATING, RecalculateCompanyRating, RecalculateCompanyRatingSuccess, RecalculateCompanyRatingError } from 'src/app/store/actions/rating.action';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class RatingEffects {
  constructor(
    private readonly actions: Actions,
    private readonly ratingService: RatingService,
    private readonly firestore: AngularFirestore,
  ) {}

  @Effect()
  recalculateCompanyRating$: Observable<Action> = this.actions.pipe(
    ofType(RECALCULATE_COMPANY_RATING),
    switchMap((action: RecalculateCompanyRating) => this.ratingService.getCompanyStars(action.payload.companyId).pipe(
        map(array => {
            const ratings = array.map(v => v.value);
            return ratings.length
            ? ratings.reduce((total, val) => total + val) / array.length
            : 0;}
        ),
        map(value => ({value, companyId: action.payload.companyId }))
    )),
    switchMap(data => this.firestore
        .collection('companies')
        .doc(data.companyId)
        .set({rating: data.value}, { merge: true })),
    map(_ => new RecalculateCompanyRatingSuccess()),
    catchError(_ => of(new RecalculateCompanyRatingError()))
  );
};