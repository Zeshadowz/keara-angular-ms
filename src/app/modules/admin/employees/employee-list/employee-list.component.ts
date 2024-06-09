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
import { MatCheckbox } from "@angular/material/checkbox";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTooltip } from "@angular/material/tooltip";
import { MatMiniFabButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

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
    MatIconModule
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
