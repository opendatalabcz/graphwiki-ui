import {Component} from '@angular/core';
import {RouteConstants} from '@core/constants/route-constants';
import {Router} from '@angular/router';
import {SearchCompanyRecord, SearchPersonRecord} from '@graphwiki/graph-service-api';
import {EntryEndpointService} from '@src/services/entry-endpoint-service';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
    selector: 'app-search-entry',
    templateUrl: 'search-entry.component.html'
})
export class SearchEntryComponent {

    RouteConstants = RouteConstants;
    selectedVertexFormControl: FormControl;

    constructor(private router: Router,
                public entryEndpointService: EntryEndpointService,
                fb: FormBuilder) {
        this.selectedVertexFormControl = fb.control(null);

        this.selectedVertexFormControl.valueChanges.subscribe((record: SearchPersonRecord | SearchCompanyRecord) =>
            this.router.navigate([RouteConstants.GRAPH_DISPLAY, record.links.graph.href])
        );
    }
}
