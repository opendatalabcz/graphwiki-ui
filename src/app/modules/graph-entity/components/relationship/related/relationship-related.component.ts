import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {LinkTO} from '@core/entities/linkTO';
import {HttpGenericService} from '@src/services/http-generic.service';
import {RelatedRelationshipsTO, RelationshipTO, VertexTO} from '@graphwiki/graph-service-api';
import {RouteConstants} from '@core/constants/route-constants';

@Component({
    selector: 'app-relationship-related',
    templateUrl: 'relationship-related.component.html'
})
export class RelationshipRelatedComponent implements OnChanges {

    @Input()
    link: LinkTO;

    RouteConstants = RouteConstants;
    relationships: RelatedRelationshipsTO;
    sourceVertexResolver: (relationship: RelationshipTO) => VertexTO = relationship => relationship.source;
    targetVertexResolver: (relationship: RelationshipTO) => VertexTO = relationship => relationship.target;

    constructor(private httpGenericService: HttpGenericService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.link) {
            this.getData();
        }
    }

    private getData() {
        this.httpGenericService.get<RelatedRelationshipsTO>(this.link).subscribe(relationships => this.relationships = relationships);
    }
}
