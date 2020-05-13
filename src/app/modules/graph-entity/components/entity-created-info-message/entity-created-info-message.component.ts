import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-entity-created-info-message',
    templateUrl: 'entity-created-info-message.component.html'
})
export class EntityCreatedInfoMessageComponent {

    @Input()
    show = false;
}
