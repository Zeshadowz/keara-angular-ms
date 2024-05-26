import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { RouterLink, RouterOutlet } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { SignUpModel } from "../../../core/auth/model/sign-up.model";
import { controlsOf } from "../../../utils/form/form-type.utils";
import { MatCheckbox } from "@angular/material/checkbox";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatInput,
    RouterLink,
    ReactiveFormsModule,
    RouterOutlet,
    MatCheckbox
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  title: string = 'Welcome!';

  form: FormGroup<controlsOf<SignUpModel>>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: fb.nonNullable.control('', []),
      gender: fb.nonNullable.control('', []),
      firstname: fb.nonNullable.control('', []),
      lastname: fb.nonNullable.control('', []),
      email: fb.nonNullable.control('', []),
      phone: fb.nonNullable.control('', []),
      password: fb.nonNullable.control('', []),
      passwordVerification: fb.nonNullable.control('', []),
      role: fb.nonNullable.control('', [])
    })
  }

  onLogin() {

  }

  isControlInvalid(control: string, error: string) {
    return this.form.get(control)?.hasError(error);
  }
}
