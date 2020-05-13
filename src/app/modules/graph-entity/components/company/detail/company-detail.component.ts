import {Component} from '@angular/core';
import {CompanyTO} from '@graphwiki/graph-service-api';
import {HttpGenericService} from '@src/services/http-generic.service';
import {ActivatedRoute} from '@angular/router';
import {GraphEntityDetailParent} from '@graph-entity/components/graph-entity-parent/GraphEntityDetailParent';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-company-detail',
    templateUrl: 'company-detail.component.html'
})
export class CompanyDetailComponent extends GraphEntityDetailParent<CompanyTO> {

    constructor(httpGenericService: HttpGenericService, route: ActivatedRoute, dialog: MatDialog) {
        super(httpGenericService, route, dialog);
    }
}
