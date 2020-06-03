import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompanyCard, Category, CompanyPreview, SearchResult } from 'src/app/shared/models';
import { CategoriesService, AlgoliaService } from 'src/app/shared/services';
import { take, map, tap, takeUntil, filter, takeWhile, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SafeComponent } from 'src/app/shared/helpers';

@Component({
  selector: 'wd-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent extends SafeComponent implements OnInit, OnChanges {

  @Input() page: number;
  @Output() result: EventEmitter<CompanyPreview[]> = new EventEmitter();
  @Output() total: EventEmitter<number> = new EventEmitter();

  private searchIndex = {
    default: 'companies_search',
    rating: 'companies_search_rating_desc',
    date: 'companies_search_date_desc'
  };

  public loading: boolean = false;

  public homeSearch: FormGroup;
  public categories: Category[] = [];
  public sortBy = [{
    title: 'Date',
    value: 'date'
  }, {
    title: 'Rating',
    value: 'rating'
  }]

  public hits: any[] = [];
  public showResults: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoriesService: CategoriesService,
    private readonly algoliaService: AlgoliaService
  ) {
    super();
   }

  private formInit(): void {
    this.homeSearch = this.formBuilder.group({
      search: [''],
      category: [],
      sort: []
    })
  }

  private getAllCategories(): void {
    this.categoriesService.getAllCategories().pipe(
      take(1)
    ).subscribe((categories: Category[]) => {
      this.categories = categories
    })
  }

  public getCategoryTitle(titleId: number): string {
    return this.categoriesService.getCategoryTitle(titleId)
  }

  public toggleHits(): void {
    const { search } = this.homeSearch.value

    if (search.length === 0) this.hits = []

    setTimeout(() => {
      this.showResults = !this.showResults
    }, 150)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.page.previousValue != changes.page.currentValue) {
      this.search(false, true)
    }
  }

  public search(isKeyup?: boolean, isPagination?: boolean): void {
    if (this.homeSearch) {
      const { search, category, sort } = this.homeSearch.value
      const nextPage = this.page - 1

      if (this.homeSearch.dirty) this.loading = true

      if (isKeyup) {
        const mq = window.matchMedia('(max-width: 767px)')
        if (mq.matches) return
      }

      let q = {
        collection: this.searchIndex.default,
        query: search,
        hitsPerPage: 20,
        page: 0,
        filters: undefined
      }

      if (category) q.filters = `category = ${category}`
      if (sort) q.collection = this.searchIndex[sort]
      if (!isKeyup) q.page = nextPage

      this.algoliaService.indexSearch(
        q.collection,
        q.query,
        q.hitsPerPage,
        q.page,
        q.filters
      )
        .pipe(
          takeUntil(this.unsubscriber),
          tap((result: SearchResult)=> {
            if (isKeyup) {
              if (search.length > 3) this.hits = result.hits
              else this.hits = []
            }

            if (!isKeyup) {
              this.result.emit(result.hits)
              this.total.emit(result.total)
            }

            if (this.homeSearch.dirty) {
              this.loading = false
              this.homeSearch.markAsPristine()
            }
          })
        ).subscribe()
    }
  }

  ngOnInit(): void {
    this.formInit()
    this.search()
    this.getAllCategories()

    this.homeSearch.get('search').valueChanges.pipe(
      distinctUntilChanged(),
      tap(val => {
        if (val === '') this.hits = []
      })
    ).subscribe()
  }
}
