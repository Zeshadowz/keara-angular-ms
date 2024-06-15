import { Component } from '@angular/core';
import { genderList, roleList, titleList } from "../../../../core/constants/gender.constant";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatError, MatFormField, MatLabel, MatPrefix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { controlsOf } from "../../../../utils/form/form-type.utils";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { EmployeeMain } from "../../../../shared/model/EmployeeMain.model";
import { emailValidator, UniqueEmailValidator } from "../../../../shared/validators/email.validator";
import { AuthService } from "../../../../core/auth/auth.service";
import { EmployeeService } from "../../../../shared/services/employee.service";
import { WidgetsComponent } from "../../../../shared/components/widgets/widgets.component";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCheckbox,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    RouterLink,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatPrefix,
    MatRow,
    MatRowDef,
    MatTable,
    MatTooltip,
    WidgetsComponent
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  title: string = '';

  basisDataForm: FormGroup<controlsOf<EmployeeMain>>;

  constructor(private fb: FormBuilder, private authService: AuthService, private employeeService: EmployeeService) {
    this.basisDataForm = this.fb.group({
      gender: fb.nonNullable.control('', [Validators.required]),
      title: fb.nonNullable.control('', []),
      name: fb.nonNullable.control('', []),
      firstname: fb.nonNullable.control('poiuztr', [Validators.required]),
      lastname: fb.nonNullable.control('ertzui', [Validators.required]),
      dateOfBirth: fb.nonNullable.control('', [Validators.required]),
      position: fb.nonNullable.control('dfghjk', []),
      email: fb.nonNullable.control('arz@emil.de', [emailValidator], [UniqueEmailValidator(this.authService)]),
      phone: fb.nonNullable.control('456789', []),
      active: fb.nonNullable.control(false)
    });
  }

  save() {
    if (this.basisDataForm.valid) {
      const employee = <EmployeeMain>this.basisDataForm.value;
      this.employeeService.create(employee);
    }
  }

  isControlInvalid(control: string, error: string) {
    return this.basisDataForm.get(control)?.hasError(error);
  }

  protected readonly titleList = titleList;
  protected readonly genderList = genderList;
  protected readonly roleList = roleList;
}
