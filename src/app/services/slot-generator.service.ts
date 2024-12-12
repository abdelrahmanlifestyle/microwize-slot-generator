import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlotGeneratorService {
  slots: { start: string, end: string }[] = [];
  timeZones: string[] = Intl.supportedValuesOf('timeZone');
  validRange = {start: new Date().toUTCString(), end: new Date().toUTCString()};
  formTimeZone = 'America/New_York';
}
