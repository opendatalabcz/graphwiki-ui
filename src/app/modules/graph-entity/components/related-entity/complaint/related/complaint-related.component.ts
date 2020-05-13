import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RelatedComplaintsTO} from '@graphwiki/graph-service-api';
import {LinkTO} from '@core/entities/linkTO';
import {HttpGenericService} from '@src/services/http-generic.service';

@Component({
    selector: 'app-complaint-related',
    templateUrl: 'complaint-related.component.html'
})
export class ComplaintRelatedComponent implements OnChanges {

    @Input()
    link: LinkTO;

    relatedComplaints: RelatedComplaintsTO;

    constructor(private httpGenericService: HttpGenericService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.link) {
            this.getData();
        }
    }

    private getData() {
        this.httpGenericService.get<RelatedComplaintsTO>(this.link)
            .subscribe(relatedComplaints => this.relatedComplaints = relatedComplaints);
    }
}
