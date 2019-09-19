import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { CompanyCard } from 'src/app/shared/models';
import { Subject } from 'rxjs';

@Component({
  selector: 'wd-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public homeSearch: FormGroup

  types = ['Companies', 'Freelancers']
  categories = ['All', 'Cats', 'Dogs']

  @Output() items$: Subject<CompanyCard[]> = new Subject()

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly angularFirestore: AngularFirestore
  ) {  }

  private formInit(): void {
    this.homeSearch = this.formBuilder.group({
      search: [''],
      type: ['Companies'],
      category: ['All']
    })
  }

  public search() {
    let { search, type, category } = this.homeSearch.value

    type = type.toLowerCase()

    let response = this.angularFirestore.collection(type, (ref: firebase.firestore.CollectionReference) => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref

      if (category !== 'All') {
        query = query.where('category', '==', category)
      }

      if (search) {
        query = query.orderBy('title')
          .startAt(search.toUpperCase())
          .endAt(search.toLowerCase()+'\uf8ff')
      }

      return query
    }).valueChanges().pipe(
      map((data: CompanyCard[]) => data)
    )

    response.subscribe(res => {
      this.items$.next(res)
    })
  }

  ngOnInit() {
    this.formInit()
  }

}
