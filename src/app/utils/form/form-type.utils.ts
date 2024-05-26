import { FormControl, FormGroup } from "@angular/forms";

export type controlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any>
    ? FormGroup<controlsOf<T[K]>>
    : FormControl<T[K]>;
};
