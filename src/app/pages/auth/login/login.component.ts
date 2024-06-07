import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../../core/auth/auth.service";
import { controlsOf } from "../../../utils/form/form-type.utils";
import { LoginModel } from "../../../core/auth/model/login.model";
import { emailValidator } from "../../../shared/validators/email.validator";
import { passwordValidator } from "../../../shared/validators/password.validator";

@Component({
  selector: 'kea-login',
  standalone: true,
  imports: [
    RouterLink,
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
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSubmitting: boolean = false;
  isCredentialsInvalid: boolean = false;

  loginForm: FormGroup<controlsOf<LoginModel>>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: this.fb.nonNullable.control('', [emailValidator]),
      password: this.fb.nonNullable.control('', [passwordValidator]),
    })
  }

  login() {
    this.isSubmitting = true;
  }

  isControlInvalid(control: string, error: string) {
    return this.loginForm.get(control)?.hasError(error);
  }

}
