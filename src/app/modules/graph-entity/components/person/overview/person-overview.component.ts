import {Component} from '@angular/core';
import {PersonTO} from '@graphwiki/graph-service-api';
import {GraphEntityOverviewParent} from '@graph-entity/components/graph-entity-parent/GraphEntityOverviewParent';

@Component({
    selector: 'app-person-overview',
    templateUrl: 'person-overview.component.html'
})
export class PersonOverviewComponent extends GraphEntityOverviewParent<PersonTO> {
}
