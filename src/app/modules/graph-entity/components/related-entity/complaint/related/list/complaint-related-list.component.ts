import {Component, Input} from '@angular/core';
import {ComplaintTO} from '@graphwiki/graph-service-api';
import {RouteConstants} from '@core/constants/route-constants';
import {MomentUtil} from '@core/util/moment-util';

declare type RelatedComplaintsMatIcon = 'today' | 'history';

@Component({
    selector: 'app-complaint-related-list',
    templateUrl: 'complaint-related-list.component.html'
})
export class ComplaintRelatedListComponent {

    @Input()
    header: string;
    @Input()
    complaints: ComplaintTO[];
    @Input()
    matIcon: RelatedComplaintsMatIcon;

    RouteConstants = RouteConstants;
    MomentUtil = MomentUtil;
}
