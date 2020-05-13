import {Component, Input} from '@angular/core';

export declare type ACRONYM_COLOR_CLASS = 'acronym-info' | 'acronym-success' | 'acronym-danger' | 'acronym-secondary';

@Component({
    selector: 'app-acronym-icon',
    templateUrl: 'acronym-icon.component.html',
    styleUrls: ['acronym-icon.component.scss']
})
export class AcronymIconComponent {

    @Input()
    acronym: string;
    @Input()
    colorClass: ACRONYM_COLOR_CLASS = 'acronym-info';
}
