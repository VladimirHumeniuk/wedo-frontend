import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';

interface dataTableColumn {
  title: string;
  key: string;
  options?: dataTableColumnOptions;
}

interface dataTableColumnOptions {
  code?: boolean;
  date?: boolean;
  bool?: boolean;
  align?: string;
  minWidth?: number;
}

interface dataTableActions {
  edit?: boolean;
  remove?: boolean;
  add?: boolean;
}

@Component({
  selector: 'wd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() loading: boolean;

  @Input() id: string;
  @Input() columns: dataTableColumn[];
  @Input() data: object[];
  @Input() actions: dataTableActions;
  @Input() name: string;

  @Input() pagination: boolean;
  @Input() paginationId: string;
  @Input() itemsPerPage: number;
  @Input() paginationPosition: string;

  @Output() removeEvent: EventEmitter<any> = new EventEmitter();
  @Output() pageChange: EventEmitter<any> = new EventEmitter();

  public p: number = 1;

  public emitAction(id: string, action: string): void {
    const actions: { [key: string]: EventEmitter<any> } = {
      'remove': this.removeEvent
    }

    actions[action].emit([id])
  }

  public changePage(page: number): void {
    this.p = page
    this.pageChange.emit(this.p)
  }

  public openRemovePrompt(id: any): void {
    const name = this.name

    this.dialogService.open(PromptDialogComponent, {
      closeOnEsc: true,
      autoFocus: false,
      hasScroll: false,
      context: { name, id }
    }).onClose.subscribe((proceed: boolean) => {
      if (proceed) {
        this.emitAction(id, 'remove')
      }
    })
  }

  public goToEdit(id: string): void {
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: { id }
    })
  }

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialogService: NbDialogService
  ) { }

  ngOnInit() {}

}
