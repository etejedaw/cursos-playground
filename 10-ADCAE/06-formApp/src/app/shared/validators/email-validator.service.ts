import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  validate(control: AbstractControl) {
    const email = control.value;
    const httpCallObservable = new Observable<ValidationErrors>(
      (subscriber) => {
        if (email === 'test@angular.com') {
          subscriber.next({ emailTaken: true });
          subscriber.complete();
          return;
        }
        subscriber.next();
        subscriber.complete();
        return;
      }
    ).pipe(delay(2000));
    return httpCallObservable;
  }
}
