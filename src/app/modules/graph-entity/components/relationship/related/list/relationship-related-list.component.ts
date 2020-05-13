import {Component, Input} from '@angular/core';
import {RelationshipTO, VertexTO} from '@graphwiki/graph-service-api';
import {RouteConstants} from '@core/constants/route-constants';
import {MomentUtil} from '@core/util/moment-util';

declare type RelationshipRelatedIcon = 'call_received' | 'call_made';

@Component({
    selector: 'app-relationship-related-list',
    templateUrl: './relationship-related-list.component.html'
})
export class RelationshipRelatedListComponent {

    @Input()
    header: string;
    @Input()
    relationships: RelationshipTO[];
    @Input()
    matIconType: RelationshipRelatedIcon;
    @Input()
    otherVertexResolver: (relationship: RelationshipTO) => VertexTO;

    RouteConstants = RouteConstants;
    MomentUtil = MomentUtil;
}
