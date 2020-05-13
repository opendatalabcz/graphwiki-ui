import {Component, Input} from '@angular/core';
import {v1 as uuid} from 'uuid';

@Component({
  selector: 'app-section',
  templateUrl: 'section.component.html',
  styleUrls: ['section.component.scss']
})
export class SectionComponent {

  @Input()
  header: string;

  elementId = uuid();
}
