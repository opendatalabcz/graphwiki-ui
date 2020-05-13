import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {LinkTO} from '@core/entities/linkTO';
import {HistoryTO, HistoryType} from '@graphwiki/graph-service-api';
import {RouteConstants} from '@core/constants/route-constants';
import {HttpGenericService} from '@src/services/http-generic.service';

@Component({
    selector: 'app-history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.scss']
})
export class HistoryComponent implements OnChanges {

    @Input()
    link: LinkTO;

    RouteConstants = RouteConstants;
    historyList: HistoryTO[];

    constructor(private httpGenericService: HttpGenericService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.link) {
            this.getData();
        }
    }

    getData() {
        this.httpGenericService.get<HistoryTO[]>(this.link).subscribe(historyList => this.historyList = historyList);
    }

    getRouterConstant(history: HistoryTO): string {
        switch (history.type) {
            case HistoryType.ENTITYREQUESTCREATED:
            case HistoryType.ENTITYREQUESTAPPROVED:
            case HistoryType.ENTITYREQUESTREJECTED:
                return RouteConstants.ENTITY_REQUEST_DETAIL;
            case HistoryType.COMPLAINTCREATED:
            case HistoryType.COMPLAINTAPPROVED:
            case HistoryType.COMPLAINTREJECTED:
                return RouteConstants.COMPLAINT_DETAIL;
            default:
                throw Error(`Cannot provide router constant for history type ${history.type}`);
        }
    }

    getActionLabel(history: HistoryTO): string {
        switch (history.type) {
            case HistoryType.STATETRANSITION:
                return 'made a state transition';
            case HistoryType.ENTITYREQUESTCREATED:
                return 'created an entity request';
            case HistoryType.ENTITYREQUESTAPPROVED:
                return 'approved an entity request';
            case HistoryType.ENTITYREQUESTREJECTED:
                return 'rejected an entity request';
            case HistoryType.COMPLAINTCREATED:
                return 'created a complaint';
            case HistoryType.COMPLAINTAPPROVED:
                return 'approved a complaint';
            case HistoryType.COMPLAINTREJECTED:
                return 'rejected a complaint';
        }
        throw Error(`Unknown history type ${history.type}`);
    }
}
