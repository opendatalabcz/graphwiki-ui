import {Component} from '@angular/core';
import {RelationshipTO} from '@graphwiki/graph-service-api';
import {GraphEntityOverviewParent} from '@graph-entity/components/graph-entity-parent/GraphEntityOverviewParent';

@Component({
  selector: 'app-relationship-overview',
  templateUrl: 'relationship-overview.component.html'
})
export class RelationshipOverviewComponent extends GraphEntityOverviewParent<RelationshipTO> {
}
