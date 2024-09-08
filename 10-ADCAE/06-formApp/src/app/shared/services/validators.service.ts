import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  firstNameAndLastnamePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  cantBeStrider(control: FormControl): ValidationErrors | undefined {
    const value = control.value.trim().toLowerCase() as string;
    if (value === 'strider') return { noStrider: true };
    return;
  }

  isValidField(form: FormGroup, field: keyof typeof form.controls): boolean {
    return Boolean(form.controls[field].errors && form.controls[field].touched);
  }

  areFieldsEquals(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;
      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }
      formGroup.get(field2)?.setErrors({});
      return null;
    };
  }
}
