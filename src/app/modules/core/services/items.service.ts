import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyCard } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  public items$: Subject<CompanyCard[]> = new Subject()

  constructor(
    private readonly angularFirestore: AngularFirestore
  ) { }

  public getItems(type: string, search?: string, category?: string) {

    const response = this.angularFirestore.collection(type.toLocaleLowerCase(), (ref: firebase.firestore.CollectionReference) => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref

      if (category && category !== 'All') {
        query = query.where('category', '==', category)
      }

      if (search) {
        query = query.orderBy('title')
          .startAt(search)
          .endAt(search+'\uf8ff')
      }

      return query
    }).valueChanges().pipe(
      map((data: CompanyCard[]) => data)
    )

    response.subscribe((res: CompanyCard[]) => {
      console.log(res)
      this.items$.next(res)
    })
  }
}
