import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Inject,
  OnInit,
  Renderer2,
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
    WidgetsComponent
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput!: ElementRef;

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

  constructor(
    private empService: EmployeeService,
    private renderer: Renderer2,
    private destroyRef: DestroyRef,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.dataSource = new MatTableDataSource<EmployeeInfo>();
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
    // if (!row) {
    //   return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    // }
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
    for (const employee of this.selection.selected) {
      console.log(employee)
    }
    // for (const employee of this.selection.selected) {
    //   console.log('removing ', employee.id, employee.firstName)
    //   await this.empService.remove(employee)
    //     .then(r => {
    //       console.log('removed ', r.id, r.firstName);
    //     }).catch(reason => {
    //       console.error('Error removing ', employee.id, employee.firstName, reason);
    //     });
    //   console.log(' ')
    // }
    console.log('Load data...')
    this.selection.clear()
    this.refresh()
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
}
