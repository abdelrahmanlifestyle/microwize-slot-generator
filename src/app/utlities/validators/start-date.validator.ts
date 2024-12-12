import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function startDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.value;
    if (!startDate) {
      return null; // Don't validate if no date is selected
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part to compare only the date
    const selectedDate = new Date(startDate);

    return selectedDate >= today ? null : {startDateInvalid: true}; // Error if the date is before today
  };
}
