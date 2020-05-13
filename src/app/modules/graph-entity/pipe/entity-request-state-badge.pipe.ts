import {Pipe, PipeTransform} from '@angular/core';
import {EntityRequestState} from '@graphwiki/graph-service-api';
import {BadgeType} from '@core/entities/badge.entities';

@Pipe({
    name: 'entityRequestStateBadge'
})
export class EntityRequestStateBadgePipe implements PipeTransform {

    transform(state: EntityRequestState): BadgeType {
        switch (state) {
            case EntityRequestState.NEW:
                return 'badge-info';
            case EntityRequestState.APPROVED:
                return 'badge-success';
            case EntityRequestState.REJECTED:
                return 'badge-warning';
            case EntityRequestState.ENTITYMODIFIED:
                return 'badge-secondary';
            default:
                return 'badge-dark';
        }
    }
}
