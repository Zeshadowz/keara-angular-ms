import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { RouterLink, RouterOutlet } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SignUpModel } from "../../../core/auth/model/sign-up.model";
import { controlsOf } from "../../../utils/form/form-type.utils";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatSelectionList } from "@angular/material/list";
import { MatOption, MatSelect, MatSelectTrigger } from "@angular/material/select";
import { AuthService } from "../../../core/auth/auth.service";
import { emailValidator } from "../../../shared/validators/email.validator";
import { passwordValidator } from "../../../shared/validators/password.validator";
import { confirmPasswordValidator } from "../../../shared/validators/confirm-password.validator";
import { genderList, roleList, titleList } from "../../../core/constants/gender.constant";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatFormFieldModule,
    MatInput,
    RouterLink,
    ReactiveFormsModule,
    RouterOutlet,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton,
    MatSelectionList,
    MatSelect,
    MatOption,
    MatSelectTrigger
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  title: string = 'Welcome!';

  registrationForm: FormGroup<controlsOf<SignUpModel>>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group({
      title: fb.nonNullable.control('', []),
      gender: fb.nonNullable.control('', []),
      firstname: fb.nonNullable.control('', [Validators.required]),
      lastname: fb.nonNullable.control('', []),
      email: fb.nonNullable.control('', [emailValidator]),
      phone: fb.nonNullable.control('', []),
      password: fb.nonNullable.control('', [passwordValidator]),
      confirmPassword: fb.nonNullable.control('', [confirmPasswordValidator]),
      role: fb.nonNullable.control('', []),
      terms: fb.nonNullable.control(false, [Validators.requiredTrue])
    });
  }

  proceedRegistration() {
    if (this.registrationForm.valid) {
      this.authService.registerUser(<SignUpModel>this.registrationForm.value);
    }
  }

  isControlInvalid(control: string, error: string) {
    return this.registrationForm.get(control)?.hasError(error);
  }

  protected readonly genderConstants = genderList;
  protected readonly genderList = genderList;
  protected readonly titleList = titleList;
  protected readonly roleList = roleList;
}
