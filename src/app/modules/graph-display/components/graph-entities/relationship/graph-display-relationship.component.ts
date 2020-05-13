import {Component} from '@angular/core';
import {RelationshipTO} from '@graphwiki/graph-service-api';
import {GraphDisplayEntityParent} from '@graph-display/components/graph-entities/graph-display-entity-parent';

@Component({
    selector: 'app-graph-display-relationship',
    templateUrl: 'graph-display-relationship.component.html'
})
export class GraphDisplayRelationshipComponent extends GraphDisplayEntityParent<RelationshipTO> {
}
