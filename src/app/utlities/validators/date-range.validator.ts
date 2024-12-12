import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (!startDate || !endDate) {
      return null; // Don't validate if either date is missing
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    return start <= end ? null : {dateRangeInvalid: true}; // Return an error if start is not before end
  };
}
