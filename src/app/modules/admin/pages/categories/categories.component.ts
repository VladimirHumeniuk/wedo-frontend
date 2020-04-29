import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wd-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public tableColumns = [
    { title: 'id', key: 'id' },
    { title: 'title', key: 'title' },
    {  }
  ]
  public actions = { edit: { active: true } }

  constructor() { }

  ngOnInit(): void {
  }

}
