import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompanyCard, Category } from 'src/app/shared/models';
import { ItemsService } from '../../services';
import { CategoriesService } from 'src/app/shared/services';
import { take, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'wd-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public homeSearch: FormGroup;

  public categories: Category[] = [];

  public searchConfig = {
    ...environment.algolia,
    indexName: 'companies_search'
  }

  showResults: boolean = false

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly itemsService: ItemsService,
    private readonly categoriesService: CategoriesService
  ) {  }

  public searchChanged(query: any): void {
    if (query.length) {
      this.showResults = true
    } else {
      this.showResults = false
    }
  }

  private formInit(): void {
    this.homeSearch = this.formBuilder.group({
      search: [''],
      type: ['Companies'],
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

  public search() {
    let { type, search, category } = this.homeSearch.value
    this.itemsService.getItems(type, search, category).subscribe();
  }

  ngOnInit(): void {
    this.formInit()
    this.getAllCategories()
  }

}
