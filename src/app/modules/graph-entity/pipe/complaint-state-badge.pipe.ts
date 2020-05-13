import {Pipe, PipeTransform} from '@angular/core';
import {ComplaintState, EntityRequestState} from '@graphwiki/graph-service-api';
import {BadgeType} from '@core/entities/badge.entities';

@Pipe({
    name: 'complaintStateBadge'
})
export class ComplaintStateBadgePipe implements PipeTransform {

    transform(state: ComplaintState): BadgeType {
        switch (state) {
            case ComplaintState.ADMINDECISION:
                return 'badge-info';
            case ComplaintState.APPROVED:
                return 'badge-success';
            case ComplaintState.REJECTED:
                return 'badge-warning';
            case EntityRequestState.ENTITYMODIFIED:
                return 'badge-secondary';
            default:
                return 'badge-dark';
        }
    }
}
