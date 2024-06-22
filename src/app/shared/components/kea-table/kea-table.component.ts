import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ColumnSettingsModel, KeaTablePaginationSettingsModel } from "./kea-table-settings.model";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIcon } from "@angular/material/icon";
import { NgClass, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'kea-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckbox,
    MatSortHeader,
    MatIcon,
    NgClass,
    MatPaginator,
    MatSort,
    NgIf,
    NgForOf
  ],
  templateUrl: './kea-table.component.html',
  styleUrl: './kea-table.component.scss'
})
export class KeaTableComponent implements OnInit, AfterViewInit, OnChanges {

  selectedRowIndex = -1;
  /**
   * @description Column names for the table
   */
  columnNames: string[] = [];
  @Input() enableCheckbox: boolean = false;
  /**
   * @description Allowing/Dis-allowing multi-selection of rows
   */
  @Input() allowMultiSelect: boolean = false;
  /**
   * @description `disableSorting` is configuration to disable Sorting of the entire table
   */
  @Input() disableSorting: boolean = false;
  /**
   * @description `sqColumnDefinition` is additional configuration settings provided to `sq-table`.Refer [sqColumnDefinition].
   */
  @Input() sqColumnDefinition: ColumnSettingsModel[];
  /**
   * @description `sqPaginationConfig` is additional configuration settings provided to `sq-table`.Refer [SqTablePaginationSettingsModel].
   */
  @Input() sqPaginationConfig?: KeaTablePaginationSettingsModel;
  /**
   * @description Data which will be displayed in tabular format
   */
  @Input() rowData: object[];
  /**
   * @description variable to store selection data
   */
  selection = new SelectionModel<{}>();
  /**
   * @description Local variable to convert JSON data object to MatTableDataSource
   */
  dataSource: MatTableDataSource<{}>;
  /**
   * @description ViewChild to get the MatSort directive from DOM
   */
  @ViewChild(MatSort) sort: MatSort;
  /**
   * @description ViewChild to get the MatPaginator directive from DOM
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  /**
   * @description Lifecycle hook that is called after a component's view has been fully initialized.
   */
  @Output() getSelectedRows = new EventEmitter();

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * @hidden
   */
  /**
   * Lifecycle hook that is called when any data-bound property of a datasource changes.
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['selectedRowIndex']);
    this.dataSource = new MatTableDataSource(this.rowData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.getSelectedRows.emit(this.selection.selected);

  }

  /** Gets the selected rows array on row select. */
  rowSelect() {
    this.getSelectedRows.emit(this.selection.selected);
  }

  /**
   * @hidden
   */
  /**
   * Initialize the directive/component after Angular first displays the data-bound properties
   * and sets the directive/component's input properties
   */
  ngOnInit() {
    for (const column of this.sqColumnDefinition) {
      this.columnNames.push(column.name);
    }
    // Condition to add selection column to the table
    if (this.enableCheckbox) {
      this.columnNames.splice(0, 0, 'select');
      this.sqColumnDefinition.splice(0, 0, {
        'name': 'select',
        'displayName': '#'
      });
    }
    // Setting selection model
    this.selection = new SelectionModel<{}>(this.allowMultiSelect, []);
    this.dataSource = new MatTableDataSource(this.rowData);
  }

  /** Highlights the selected row on row click. */
  highlight(row: any) {
    this.selectedRowIndex = row.position;
  }


}
