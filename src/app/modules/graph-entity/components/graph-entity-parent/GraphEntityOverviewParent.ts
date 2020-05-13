import {Input} from '@angular/core';
import {BaseComponent} from '@core/components/base-component';
import {RouteConstants} from '@core/constants/route-constants';
import {GraphEntity} from '@core/entities/graph-entity.entities';

export abstract class GraphEntityOverviewParent<T extends GraphEntity> extends BaseComponent {

    @Input()
    header = 'OVERVIEW';
    @Input()
    entity: T;
    @Input()
    headerLinkActive = false;

    RouteConstants = RouteConstants;
}
