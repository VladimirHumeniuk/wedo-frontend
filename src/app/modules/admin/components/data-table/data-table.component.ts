import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface dataTableColumn {
  title: string;
  key: string;
  options?: dataTableColumnOptions;
}

interface dataTableColumnOptions {
  code?: boolean;
}

interface dataTableActions {
  edit?: dataTableAction;
  remove?: dataTableAction;
}

interface dataTableAction {
  active: boolean;
  action?: any;
}

@Component({
  selector: 'wd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() id: string;
  @Input() columns: dataTableColumn[];
  @Input() data: Object[];
  @Input() actions: dataTableActions;

  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  public editEvent(id: string): void {
    this.onEdit.emit([id]);
  }

  constructor() {
  }

  ngOnInit() { }

}