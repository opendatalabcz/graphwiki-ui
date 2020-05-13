import {Component} from '@angular/core';
import {CompanyTO} from '@graphwiki/graph-service-api';
import {GraphEntityOverviewParent} from '@graph-entity/components/graph-entity-parent/GraphEntityOverviewParent';

@Component({
    selector: 'app-company-overview',
    templateUrl: 'company-overview.component.html'
})
export class CompanyOverviewComponent extends GraphEntityOverviewParent<CompanyTO> {
}
