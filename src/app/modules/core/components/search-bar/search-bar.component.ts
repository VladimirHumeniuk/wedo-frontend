import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompanyCard, Category, CompanyPreview } from 'src/app/shared/models';
import { ItemsService } from '../../services';
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
export class SearchBarComponent extends SafeComponent implements OnInit {

  @Output() result: EventEmitter<CompanyPreview[]> = new EventEmitter();

  private searchIndex: string = 'companies_search';

  public loading: boolean = false;
  private pristine: boolean;

  public homeSearch: FormGroup;
  public categories: Category[] = [];

  public hits: any[] = [];
  public showResults: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly itemsService: ItemsService,
    private readonly categoriesService: CategoriesService,
    private readonly algoliaService: AlgoliaService
  ) {
    super();
   }

  private formInit(): void {
    this.homeSearch = this.formBuilder.group({
      search: [''],
      category: []
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

  public search(isKeyup?: boolean): void {
    const { search, category } = this.homeSearch.value
    const submitClick = !isKeyup && (search.length > 0 || category)
    const isEmpty = !category && search.length === 0
    const isPristine = this.pristine && isEmpty

    if (isPristine) return

    if (submitClick) this.loading = true

    if (isKeyup) {
      const mq = window.matchMedia('(max-width: 767px)')
      if (mq.matches) return
    }

    this.algoliaService.indexSearch(this.searchIndex, search, category ? `category = ${category}` : undefined)
      .pipe(
        takeUntil(this.unsubscriber),
        tap((result: CompanyPreview[])=> {

          if (isKeyup) {
            if (search.length > 3) this.hits = result
            else this.hits = []
          }

          if (!isKeyup) this.result.emit(result)

          if (submitClick) {
            this.pristine = false
            this.loading = false
          }

          if (isEmpty) this.pristine = true
        })
      ).subscribe()
  }

  ngOnInit(): void {
    this.formInit()
    this.search()
    this.pristine = true
    this.getAllCategories()

    this.homeSearch.get('search').valueChanges.pipe(
      distinctUntilChanged(),
      tap(val => {
        if (val === '') this.hits = []
      })
    ).subscribe()
  }
}
