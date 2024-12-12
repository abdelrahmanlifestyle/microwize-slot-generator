import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function minAllowedTimeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const minAllowedTime = control.get('minAllowedTime')?.value;
    const slotDuration = control.get('slotDuration')?.value;

    if (!minAllowedTime || !slotDuration) {
      return null; // Don't validate if values are missing
    }

    return minAllowedTime <= slotDuration
      ? null
      : {minAllowedTimeInvalid: true}; // Error if minAllowedTime exceeds slotDuration
  };
}
