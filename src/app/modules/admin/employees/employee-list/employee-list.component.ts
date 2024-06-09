import { Component, OnInit } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import { EmployeeService } from "../../../../shared/services/employee.service";
import { EmployeeMain } from "../../../../shared/model/EmployeeMain.model";
import { SelectionModel } from "@angular/cdk/collections";
import { MatFormField, MatLabel, MatPrefix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatTooltip } from "@angular/material/tooltip";
import { MatIconButton, MatMiniFabButton } from "@angular/material/button";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatCheckbox,
    MatTooltip,
    MatMiniFabButton,
    MatIconModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatPrefix,
    MatIconButton,
    MatPaginator
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  displayedColumns = [
    'select',
    'gender',
    'title',
    'name',
    'email',
    'phone',
    'active',
    'actions',
  ];
  dataSource: MatTableDataSource<EmployeeMain>;
  selection = new SelectionModel<EmployeeMain>(true, []);

  ngOnInit(): void {
    this.loadData();
  }

  constructor(private empService: EmployeeService) {
    this.dataSource = new MatTableDataSource<EmployeeMain>();
  }

  loadData() {
    this.empService.getAll().subscribe(data => this.dataSource.data = data)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: EmployeeMain): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  addNew() {

  }

  refresh() {
    this.loadData()
  }

  removeSelectedRows() {

  }

  exportExcel() {

  }
}
