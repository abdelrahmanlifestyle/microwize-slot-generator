import {Component, inject} from '@angular/core';
import {SlotGeneratorService} from '../../services/slot-generator.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FormatTimezonePipe} from '../../pipes/format-timezone.pipe';
import {addSeconds, endOfDay, isBefore} from 'date-fns';
import {fromZonedTime} from 'date-fns-tz';

@Component({
  selector: 'app-slots-viewer',
  imports: [CommonModule, FormatTimezonePipe, FormsModule],
  standalone: true,
  templateUrl: './slots-viewer.component.html',
  styleUrls: ['./slots-viewer.component.scss']
})
export class SlotsViewerComponent {
  readonly slotGeneratorService = inject(SlotGeneratorService);
  selectedTimeZone = 'Asia/Qatar';

  /**
   * Check if the slot time is invalid based on the valid range.
   */
  invalidRange(slot: { start: string; end: string }): boolean {
    return this.isEarly(slot.start) || this.isLate(slot.end);
  }

  /**
   * Check if the start time is before the valid range start time.
   */
  private isEarly(start: string): boolean {
    const {validRange, formTimeZone} = this.slotGeneratorService;
    const slotStart = fromZonedTime(start, formTimeZone);
    const rangeStart = fromZonedTime(validRange.start, this.selectedTimeZone);
    return isBefore(slotStart, rangeStart);
  }

  /**
   * Check if the end time is after the valid range end time.
   */
  private isLate(end: string): boolean {
    const {validRange} = this.slotGeneratorService;
    const nextDay = addSeconds(endOfDay(new Date(validRange.end)), 1);
    const validEnd = fromZonedTime(nextDay, this.selectedTimeZone);
    return isBefore(validEnd, end);
  }
}
