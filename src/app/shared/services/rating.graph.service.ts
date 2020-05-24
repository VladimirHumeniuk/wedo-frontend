import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BaseApolloService } from 'src/app/shared/services/base/base.apollo.service';
import { Star } from 'src/app/shared/models/star.model';
import { getCompanyStarsQuery, getUserStarsQuery } from 'src/app/shared/api/stars.api';

@Injectable({
  providedIn: 'root'
})
export class RatingGraphService {

  constructor(
    private readonly baseApolloService: BaseApolloService,
    private readonly fireStore: AngularFirestore,
  ) { }

  public getCompanyStars(companyId: string): Observable<any[]> {
    const source = this.baseApolloService.query<{cid: string}, Star[]>(
        getCompanyStarsQuery,
        (data) => data.getCompanyStars,
        { cid: companyId });
      return source;
  }

  public getUserStars(userId: string): Observable<any[]> {
    const source = this.baseApolloService.query<{uid: string}, Star[]>(
        getUserStarsQuery,
        (data) => data.getUserStars,
        { uid: userId });
      return source;
  }

  public setStar(uid: string, cid: string, value: number) {
    const star = { uid, cid, value }

    const starPath = `${star.uid}_${star.cid}`;

    return this.fireStore.collection('stars').doc(starPath).set(star)
  }
}
