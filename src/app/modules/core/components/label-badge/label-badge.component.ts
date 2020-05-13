import {Component, Input} from '@angular/core';
import {BadgeType} from '@core/entities/badge.entities';

@Component({
    selector: 'app-label-badge',
    templateUrl: 'label-badge.component.html'
})
export class LabelBadgeComponent {
    @Input()
    label: string;
    @Input()
    value: any;
    @Input()
    badgeType: BadgeType;
}
