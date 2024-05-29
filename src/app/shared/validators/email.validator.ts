import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { EMAIL_PATTERN } from "./regex.constant";

export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return !EMAIL_PATTERN.test(control.value) ? {email: true} : null;
}
