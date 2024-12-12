import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SlotGeneratorService} from '../../services/slot-generator.service';
import {startDateValidator} from '../../utlities/validators/start-date.validator';
import {dateRangeValidator} from '../../utlities/validators/date-range.validator';
import {minAllowedTimeValidator} from '../../utlities/validators/min-allowed-time.validator';
import {addMinutes, format, isBefore} from 'date-fns';
import {fromZonedTime} from 'date-fns-tz';

type formValues = {
  startDate: string;
  endDate: string;
  timeZone: string;
  timeInterval: number;
  slotDuration: number;
  minAllowedTime: number;
};

@Component({
  selector: 'app-slot-generator-form',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './slot-generator-form.component.html',
  styleUrls: ['./slot-generator-form.component.scss']
})
export class SlotGeneratorFormComponent implements OnInit {
  slotForm!: FormGroup;
  readonly slotGeneratorService = inject(SlotGeneratorService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    if (this.slotForm.valid) {
      const formValues = this.slotForm.value;
      this.updateServiceProperties(formValues);
      this.generateSlots(formValues);
    }
  }

  private initForm(): void {
    this.slotForm = this.fb.group({
      startDate: ['', [Validators.required, startDateValidator()]],
      endDate: ['', [Validators.required]],
      timeZone: [this.slotGeneratorService.formTimeZone, [Validators.required]],
      timeInterval: [30, [Validators.required, Validators.min(1)]],
      slotDuration: [15, [Validators.required, Validators.min(1)]],
      minAllowedTime: [15, [Validators.required, Validators.min(1)]],
    }, {validators: [dateRangeValidator(), minAllowedTimeValidator()]});
  }

  private updateServiceProperties(formValues: formValues): void {
    const {startDate, endDate, timeZone} = formValues;
    this.slotGeneratorService.validRange = {start: startDate, end: endDate};
    this.slotGeneratorService.formTimeZone = timeZone;
  }

  private generateSlots(formValues: formValues): void {
    const {startDate, endDate, timeInterval, slotDuration, minAllowedTime, timeZone} = formValues;
    let start = fromZonedTime(new Date(startDate + ' 00:00:00'), timeZone);
    const end = fromZonedTime(new Date(endDate + ' 23:59:59'), timeZone);

    this.slotGeneratorService.slots = [];

    while (isBefore(start, end)) {
      const slotEnd = addMinutes(start, slotDuration);
      if (slotEnd.getTime() - start.getTime() >= minAllowedTime * 60000) {
        this.slotGeneratorService.slots.push({
          start: format(start, 'yyyy-MM-dd HH:mm'),
          end: format(slotEnd, 'yyyy-MM-dd HH:mm')
        });
      }
      start = addMinutes(slotEnd, timeInterval);
    }
  }
}
