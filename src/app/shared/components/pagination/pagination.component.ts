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
  @Input() total: number;

  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  @Output() pageBoundsCorrection: EventEmitter<any> = new EventEmitter();

  constructor() { }

  public emitPageChange(event: any): void {
    this.pageChange.emit(event)
  }

  public emitPageBoundsCorrection(event: any): void {
    this.pageBoundsCorrection.emit(event)
  }

  ngOnInit(): void {
  }

}
