import {Component} from '@angular/core';
import {CompanyTO} from '@graphwiki/graph-service-api';
import {GraphDisplayEntityParent} from '@graph-display/components/graph-entities/graph-display-entity-parent';

@Component({
    selector: 'app-graph-display-company',
    templateUrl: 'graph-display-company.component.html'
})
export class GraphDisplayCompanyComponent extends GraphDisplayEntityParent<CompanyTO> {
}
