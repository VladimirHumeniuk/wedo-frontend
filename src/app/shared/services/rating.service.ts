import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private readonly fireStore: AngularFirestore,
  ) { }

  public getUserStars(uid: string): Observable<any[]> {
    const starsRef = this.fireStore.collection('stars', ref => ref.where('uid', '==', uid))

    return starsRef.valueChanges()
  }

  public getCompanyStars(cid: string): Observable<any[]> {
    const starsRef = this.fireStore.collection('stars', ref => ref.where('cid', '==', cid))

    return starsRef.valueChanges()
  }

  public setStar(uid: string, cid: string, value: number) {
    const star = { uid, cid, value }

    const starPath = `${star.uid}_${star.cid}`;

    return this.fireStore.collection('stars').doc(starPath).set(star)
  }
}
