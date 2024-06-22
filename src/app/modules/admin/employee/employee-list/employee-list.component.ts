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
import { EmployeeMain } from "../../../../shared/model/EmployeeMain.model";
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

  rowData = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  ];

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
    this.testTableSettings();
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
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row. + 1}`;
    return '';
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

  private testTableSettings() {
    this.tablePaginationSettings.enablePagination = true;
    this.tablePaginationSettings.pageSize = 5;
    this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
    this.tablePaginationSettings.showFirstLastButtons = true;
    this.columnDefinition = [
      {
        'name': 'position',
        'displayName': 'No',
        'disableSorting': false,
      },
      {
        'name': 'name',
        'displayName': 'Name',
        'disableSorting': false,
        'icon': 'face'

      },
      {
        'name': 'weight',
        'displayName': 'Weight',
        'disableSorting': false,
        'icon': 'home'
      },
      {
        'name': 'symbol',
        'displayName': 'Symbol',
        'disableSorting': false,
        'icon': 'face'
      },
    ]
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
