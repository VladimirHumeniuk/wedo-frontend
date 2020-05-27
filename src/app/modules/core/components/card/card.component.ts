import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wd-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cid: string
  @Input() title: string
  @Input() rating: number
  @Input() category: string
  @Input() image: string
  @Input() description: string

  constructor() { }

  ngOnInit() { }

}
