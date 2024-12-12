import {Pipe, PipeTransform} from '@angular/core';
import {format,} from 'date-fns';
import {toZonedTime} from 'date-fns-tz';

@Pipe({
  name: 'formatTimezone',
  standalone: true,
})
export class FormatTimezonePipe implements PipeTransform {

  transform(date: string | Date, timeZone: string, locale: string = 'en-US'): string {
    if (!date || !timeZone) {
      return '';
    }
    const convertedTime = toZonedTime(date, timeZone);
    return format(convertedTime, 'EE, MMM dd, yyyy, hh:mm a');
  }
}
