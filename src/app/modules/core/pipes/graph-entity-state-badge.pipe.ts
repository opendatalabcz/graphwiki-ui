import {Pipe, PipeTransform} from '@angular/core';
import {GraphEntityState} from '@graphwiki/graph-service-api';
import {BadgeType} from '@core/entities/badge.entities';

@Pipe({
    name: 'graphEntityStateBadge'
})
export class GraphEntityStateBadgePipe implements PipeTransform {

    transform(state: GraphEntityState): BadgeType {
        switch (state) {
            case GraphEntityState.CONCEPT:
                return 'badge-info';
            case GraphEntityState.ACTIVE:
                return 'badge-success';
            case GraphEntityState.REJECTED:
                return 'badge-warning';
            case GraphEntityState.REVOKED:
                return 'badge-secondary';
            case GraphEntityState.DELETED:
                return 'badge-danger';
            default:
                return 'badge-dark';
        }
    }
}
