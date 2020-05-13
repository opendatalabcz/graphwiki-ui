import {Component, Input} from '@angular/core';

declare type ValueType = 'text' | 'number' | 'date' | 'link' | 'external-link';

@Component({
    selector: 'app-label-value',
    templateUrl: 'label-value.component.html'
})
export class LabelValueComponent {
    @Input()
    label: string;
    @Input()
    value: any;
    @Input()
    routerLinkMetadata: any[];
    @Input()
    externalLink: string;
    @Input()
    type: ValueType = 'text';
    @Input()
    additionalDescription: string = null;
}
