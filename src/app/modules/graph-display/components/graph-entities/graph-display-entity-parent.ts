import {Input} from '@angular/core';
import {RouteConstants} from '@core/constants/route-constants';

export abstract class GraphDisplayEntityParent<T> {

    @Input()
    entity: T;
    @Input()
    active = false;

    RouteConstants = RouteConstants;
}
