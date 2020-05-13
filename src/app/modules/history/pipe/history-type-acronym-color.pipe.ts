import {Pipe, PipeTransform} from '@angular/core';
import {ACRONYM_COLOR_CLASS} from '@core/components/acronym-icon/acronym-icon.component';
import {HistoryType} from '@graphwiki/graph-service-api';

@Pipe({
    name: 'historyTypeAcronymColor'
})
export class HistoryTypeAcronymColorPipe implements PipeTransform {

    transform(type: HistoryType): ACRONYM_COLOR_CLASS {
        switch (type) {
            case HistoryType.STATETRANSITION:
                return 'acronym-info';
            case HistoryType.ENTITYREQUESTAPPROVED:
            case HistoryType.ENTITYREQUESTCREATED:
            case HistoryType.ENTITYREQUESTREJECTED:
                return 'acronym-success';
            case HistoryType.COMPLAINTCREATED:
            case HistoryType.COMPLAINTAPPROVED:
            case HistoryType.COMPLAINTREJECTED:
                return 'acronym-danger';
            default:
                return 'acronym-secondary';
        }
    }
}
