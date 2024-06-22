import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Inject,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
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
import { SelectionModel } from "@angular/cdk/collections";
import { MatFormField, MatLabel, MatPrefix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatTooltip } from "@angular/material/tooltip";
import { MatIconButton, MatMiniFabButton } from "@angular/material/button";
import { MatPaginator } from "@angular/material/paginator";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DOCUMENT } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { BreadcrumbComponent } from "../../../../shared/components/breadcrumb/breadcrumb.component";
import { MatCardModule } from "@angular/material/card";
import { WidgetsComponent } from "../../../../shared/components/widgets/widgets.component";
import { EmployeeInfo } from "../../../../shared/model/EmployeeInfo";
import { mergeMap } from "rxjs";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { DialogData, KeaDialogComponent } from "../../../../shared/components/dialog/kea-dialog.component";
import { KeaTableComponent } from "../../../../shared/components/kea-table/kea-table.component";
import {
  ColumnSettingsModel,
  KeaTablePaginationSettingsModel
} from "../../../../shared/components/kea-table/kea-table-settings.model";

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
    MatPaginator,
    BreadcrumbComponent,
    RouterLink,
    MatCardModule,
    WidgetsComponent,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    KeaTableComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('dataDialogTemplate') dataTemplate!: TemplateRef<any>;

  matIconDelete: HTMLElement | null = null;

  displayedColumns = [
    'select',
    'name',
    'identifier',
    'designation',
    'email',
    'phone',
    'department',
  ];
  dataSource: MatTableDataSource<EmployeeInfo>;
  selection = new SelectionModel<EmployeeInfo>(true, []);

  router: Router = inject(Router);


  columnDefinition: ColumnSettingsModel[] = [];
  tablePaginationSettings: KeaTablePaginationSettingsModel = <KeaTablePaginationSettingsModel>{};

  onNotifySelected(selectedRows: object[]) {
    console.log(selectedRows)
  }

  constructor(
    private empService: EmployeeService,
    private renderer: Renderer2,
    private destroyRef: DestroyRef,
    private route: ActivatedRoute,
    private _dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.dataSource = new MatTableDataSource<EmployeeInfo>();
    this.employeeTableSettings()
  }

  ngOnInit(): void {
    this.loadData();

    /*this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => console.log(this.route.root))*/

    this.selection.changed
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        data.source.hasValue() ?
          this.renderer.addClass(this.matIconDelete, 'col-white') :
          this.renderer.removeClass(this.matIconDelete, 'col-white');
      })
  }

  private loadData() {
    this.empService.fetchAllEmployeeInfos()
      .subscribe(data => {
        console.log('Data', data)
        this.dataSource.data = data;
      })
  }

  applyFilter() {
    // It works too.
    //const filterValue = this.searchInput.nativeElement.value
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // applyFilter2(value: string) {
  //   // It works too.
  //   //const filterValue = this.searchInput.nativeElement.value
  //   this.dataSource.filter = value.trim().toLowerCase();
  // }

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
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row + 1}`;
  }

  addNew() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  refresh() {
    this.empService.fetchAllEmployeeInfos()
      .pipe(mergeMap((data) => [
        this.dataSource.data = data
      ]))
  }

  async removeSelectedRows() {
    const dialogRef: MatDialogRef<KeaDialogComponent> = this._dialog.open(KeaDialogComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: <DialogData>{
        title: 'Delete selected employee',
        dialogContent: this.dataTemplate,
        acceptButtonText: 'Yes, delete it!',
        denyButtonText: 'No, delete it!'
      }
    });
    dialogRef.componentInstance.title = 'Delete Employee Info';
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      for (const employee of this.selection.selected) {
        console.log(employee)
      }
      console.log('Load data...')
      this.selection.clear()
      this.refresh()

    })
  }

  exportExcel() {

  }

  ngAfterViewInit(): void {
    this.matIconDelete = this.document.getElementById("deleteIcon");

    this.searchInput.nativeElement.onkeyup = () => {
      const filteredData = this.searchInput.nativeElement.value
      this.dataSource.filter = filteredData.trim().toLowerCase();
    }
  }

  private employeeTableSettings() {
    this.tablePaginationSettings.enablePagination = true;
    this.tablePaginationSettings.pageSize = 5;
    this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
    this.tablePaginationSettings.showFirstLastButtons = true;
    this.columnDefinition = [
      {
        'name': 'name',
        'displayName': 'Name',
        'disableSorting': false,
      },
      {
        'name': 'identifier',
        'displayName': 'ID',
        'disableSorting': false,
        'icon': 'face'

      },
      {
        'name': 'designation',
        'displayName': 'Designation',
        'disableSorting': false,
        'icon': 'home'
      },
      {
        'name': 'email',
        'displayName': 'Email',
        'disableSorting': false,
        'icon': 'face'
      },
      {
        'name': 'phone',
        'displayName': 'Phone',
        'disableSorting': false,
        'icon': 'face'
      },
      {
        'name': 'department',
        'displayName': 'Department',
        'disableSorting': false,
        'icon': 'face'
      },
    ]
  }
}
