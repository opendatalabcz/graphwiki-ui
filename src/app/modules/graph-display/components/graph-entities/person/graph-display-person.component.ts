import {Component} from '@angular/core';
import {PersonTO} from '@graphwiki/graph-service-api';
import {GraphDisplayEntityParent} from '@graph-display/components/graph-entities/graph-display-entity-parent';

@Component({
    selector: 'app-graph-display-person',
    templateUrl: 'graph-display-person.component.html'
})
export class GraphDisplayPersonComponent extends GraphDisplayEntityParent<PersonTO> {
}
