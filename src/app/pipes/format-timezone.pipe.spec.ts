import {FormatTimezonePipe} from './format-timezone.pipe';
import {TestBed} from '@angular/core/testing';
import {format} from 'date-fns';
import {toZonedTime} from 'date-fns-tz';

describe('FormatTimezonePipe', () => {
  let pipe: FormatTimezonePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatTimezonePipe]
    });
    pipe = TestBed.inject(FormatTimezonePipe);
  });

  it('should transform a date to the correct timezone and format', () => {
    const date = new Date('2024-12-11T12:00:00Z'); // UTC time
    const timeZone = 'America/New_York';
    const expectedFormattedDate = format(toZonedTime(date, timeZone), 'EE, MMM dd, yyyy, hh:mm a');

    const result = pipe.transform(date, timeZone);

    expect(result).toBe(expectedFormattedDate);
  });

  it('should return an empty string if no date or timeZone is provided', () => {
    const result1 = pipe.transform(null as any, 'America/New_York');
    const result2 = pipe.transform(new Date(), null as any);

    expect(result1).toBe('');
    expect(result2).toBe('');
  });

  it('should default to "en-US" locale if no locale is provided', () => {
    const date = new Date('2024-12-11T12:00:00Z');
    const timeZone = 'America/New_York';
    const expectedFormattedDate = format(toZonedTime(date, timeZone), 'EE, MMM dd, yyyy, hh:mm a');

    const result = pipe.transform(date, timeZone);

    expect(result).toBe(expectedFormattedDate);
  });

  it('should return the correct formatted date with custom locale', () => {
    const date = new Date('2024-12-11T12:00:00Z');
    const timeZone = 'America/New_York';
    const locale = 'fr'; // French locale
    const expectedFormattedDate = format(toZonedTime(date, timeZone), 'EE, MMM dd, yyyy, hh:mm a', {locale: 'fr'});

    const result = pipe.transform(date, timeZone, locale);

    expect(result).toBe(expectedFormattedDate);
  });
});
