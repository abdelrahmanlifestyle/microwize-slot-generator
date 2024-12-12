import {Component} from '@angular/core';
import {SlotsViewerComponent} from './components/slots-viewer/slots-viewer.component';
import {SlotGeneratorFormComponent} from './components/slot-generator-form/slot-generator-form.component';

@Component({
  selector: 'app-root',
  imports: [SlotsViewerComponent, SlotGeneratorFormComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'date-fns-time-slots';
}
