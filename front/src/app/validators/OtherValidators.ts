import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';

export class OtherValidators {
  static integer(control: AbstractControl): ValidationErrors | null {
    const number = +control.value;
    if (isNaN(number) || Math.floor(number) !== number) {
      return { integer: { value: control.value } };
    }
    return null;
  }

  static duplicate(
    http: HttpClient,
    makeUrl: (value: string) => string
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      console.log('start to async validate', control.value);
      if (!control.value) {
        return of(null);
      }
      return http.get<unknown[]>(makeUrl(control.value)).pipe(
        map((resources) => {
          console.log('resources: ', resources);
          if (resources.length > 0) {
            return { duplicate: { value: control.value } };
          }
          return null;
        })
      );
    };
  }
}
