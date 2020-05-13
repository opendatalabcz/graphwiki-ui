import {Component} from '@angular/core';
import {RelationshipTO} from '@graphwiki/graph-service-api';
import {HttpGenericService} from '@src/services/http-generic.service';
import {ActivatedRoute} from '@angular/router';
import {GraphEntityDetailParent} from '@graph-entity/components/graph-entity-parent/GraphEntityDetailParent';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-relationship-detail',
    templateUrl: 'relationship-detail.component.html'
})
export class RelationshipDetailComponent extends GraphEntityDetailParent<RelationshipTO> {

    constructor(httpGenericService: HttpGenericService, route: ActivatedRoute, dialog: MatDialog) {
        super(httpGenericService, route, dialog);
    }
}
