import { Component, Input, OnInit } from '@angular/core';
import { CompanyCard } from 'src/app/shared/models';

@Component({
  selector: 'wd-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrls: ['./cards-grid.component.scss']
})
export class CardsGridComponent implements OnInit {

  @Input() items: CompanyCard[]

  constructor() { }

  ngOnInit() {
  }

}
