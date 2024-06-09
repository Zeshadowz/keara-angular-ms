import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { EMAIL_PATTERN } from "./regex.constant";
import { map, Observable } from "rxjs";
import { AuthService } from "../../core/auth/auth.service";

export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return !EMAIL_PATTERN.test(control.value) ? {pattern: true} : null;
}

export const UniqueEmailValidator = (service: AuthService): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.fetchUserByEmail(control.value)
      .pipe(
        map(response => {
          return response ? {exists: true} : null;
        })
      );
  };
};
