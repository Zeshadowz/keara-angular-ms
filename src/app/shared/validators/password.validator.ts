import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { PASSWORD_PATTERN } from "./regex.constant";

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.value;
  if (password.length <= 7) {
    return {length: true};
  }
  return !PASSWORD_PATTERN.test(control.value) ? {pattern: true} : null;
}
