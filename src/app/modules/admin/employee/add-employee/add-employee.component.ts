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
    MatTooltip
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  title: string = '';

  basisDataForm: FormGroup<controlsOf<EmployeeMain>>;
  i = 0;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.basisDataForm = this.fb.group({
      gender: fb.nonNullable.control('1', []),
      title: fb.nonNullable.control('', []),
      name: fb.nonNullable.control('', []),
      firstname: fb.nonNullable.control('poiuztr', [Validators.required]),
      lastname: fb.nonNullable.control('ertzui', []),
      dateOfBirth: fb.nonNullable.control('', []),
      position: fb.nonNullable.control('dfghjk', []),
      email: fb.nonNullable.control('arz@emil.de', [emailValidator], [UniqueEmailValidator(this.authService)]),
      phone: fb.nonNullable.control('456789', []),
      active: fb.nonNullable.control(false)
    });
  }

  save() {
    if (this.basisDataForm.valid) {
      this.i++;
      const data = <EmployeeMain>this.basisDataForm.value;
      console.log(this.i, data)
    }
  }

  isControlInvalid(control: string, error: string) {
    return this.basisDataForm.get(control)?.hasError(error);
  }

  protected readonly titleList = titleList;
  protected readonly genderList = genderList;
  protected readonly roleList = roleList;
}
