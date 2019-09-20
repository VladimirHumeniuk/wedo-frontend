import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompanyCard } from 'src/app/shared/models';
import { ItemsService } from '../../services';

@Component({
  selector: 'wd-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public homeSearch: FormGroup

  types = ['Companies', 'Freelancers']
  categories = ['All', 'Security', 'Cleaning']

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly itemsService: ItemsService
  ) {  }

  private formInit(): void {
    this.homeSearch = this.formBuilder.group({
      search: [''],
      type: ['Companies'],
      category: ['All']
    })
  }

  public search() {
    let { type, search, category } = this.homeSearch.value
    this.itemsService.getItems(type, search, category)
  }

  ngOnInit() {
    this.formInit()
  }

}
