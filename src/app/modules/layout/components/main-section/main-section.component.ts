import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-main-section',
  templateUrl: 'main-section.component.html',
  styleUrls: ['main-section.component.scss']
})
export class MainSectionComponent {

  @Input()
  header: string;
}
