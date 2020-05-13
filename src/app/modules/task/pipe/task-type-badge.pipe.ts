import {Pipe, PipeTransform} from '@angular/core';
import {TaskType} from '@graphwiki/task-service-api';
import {BadgeType} from '@core/entities/badge.entities';

@Pipe({
    name: 'taskTypeBadge'
})
export class TaskTypeBadgePipe implements PipeTransform {

    transform(type: TaskType): BadgeType {
        switch (type) {
            case TaskType.COMPLAINT:
                return 'badge-danger';
            case TaskType.ENTITYREQUEST:
                return 'badge-success';
            default:
                return 'badge-dark';
        }
    }
}
