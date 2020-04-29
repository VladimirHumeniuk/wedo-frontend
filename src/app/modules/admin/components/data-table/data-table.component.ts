import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface dataTableColumn {
  title: string;
  key: string;
  options?: dataTableColumnOptions;
}

interface dataTableColumnOptions {
  code?: boolean;
  date?: boolean;
}

interface dataTableActions {
  edit?: dataTableAction;
  remove?: dataTableAction;
  add?: dataTableAction;
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
  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  @Output() onRemove: EventEmitter<any> = new EventEmitter();

  public emitAction(id: string, action: string): void {
    const actions: { [key: string]: EventEmitter<any> } = {
      'edit': this.onEdit,
      'add': this.onAdd,
      'remove': this.onRemove
    }

    actions[action].emit([id])
  }

  constructor() {
  }

  ngOnInit() { }

}
