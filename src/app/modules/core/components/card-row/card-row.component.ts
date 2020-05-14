import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wd-card-row',
  templateUrl: './card-row.component.html',
  styleUrls: ['./card-row.component.scss']
})
export class CardRowComponent implements OnInit {

  @Input() title: string;
  @Input() align: string;

  constructor() { }

  ngOnInit(): void {
  }

}
