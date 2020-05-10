import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'wd-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() id: string;
  @Input() position: string;

  @Output() pageChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  public emitPageChange(event: any): void {
    this.pageChange.emit([event])
  }

  ngOnInit(): void {
  }

}
