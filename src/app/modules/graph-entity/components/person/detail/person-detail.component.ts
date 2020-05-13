import {Component} from '@angular/core';
import {PersonTO} from '@graphwiki/graph-service-api';
import {ActivatedRoute} from '@angular/router';
import {HttpGenericService} from '@src/services/http-generic.service';
import {GraphEntityDetailParent} from '@graph-entity/components/graph-entity-parent/GraphEntityDetailParent';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-person-detail',
    templateUrl: 'person-detail.component.html'
})
export class PersonDetailComponent extends GraphEntityDetailParent<PersonTO> {

    constructor(httpGenericService: HttpGenericService, route: ActivatedRoute, dialog: MatDialog) {
        super(httpGenericService, route, dialog);
    }
}
