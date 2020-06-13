import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApolloService } from 'src/app/shared/services/base/base.apollo.service';
import { Star } from 'src/app/shared/models/star.model';
import { getCompanyStarsQuery, getUserStarsQuery, setStarMutation } from 'src/app/shared/api/stars.api';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private readonly baseApolloService: BaseApolloService,
  ) { }

  public getCompanyStars(companyId: string): Observable<Star[]> {
    const source = this.baseApolloService.query<{cid: string}, Star[]>(
        getCompanyStarsQuery,
        (data) => data.getCompanyStars,
        { cid: companyId });
      return source;
  }

  public getUserStars(userId: string): Observable<Star[]> {
    const source = this.baseApolloService.query<{uid: string}, Star[]>(
        getUserStarsQuery,
        (data) => data.getUserStars,
        { uid: userId });
      return source;
  }

  public setStar(uid: string, cid: string, value: number): Observable<boolean> {
    const star = { uid, cid, value };
    const source$ = this.baseApolloService.mutation<{star: Star}, boolean>(
        setStarMutation,
        data => data.setStar, {
        star
    });

    return source$;
  }
}
