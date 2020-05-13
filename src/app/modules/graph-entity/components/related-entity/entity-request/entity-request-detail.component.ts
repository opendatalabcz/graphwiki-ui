import {Component, OnInit} from '@angular/core';
import {resolveUrlParam, URL_PARAM} from '@core/util/url-param-resolver';
import {ActivatedRoute} from '@angular/router';
import {EntityRequestTO} from '@graphwiki/graph-service-api';
import {LinkTO} from '@core/entities/linkTO';
import {HttpGenericService} from '@src/services/http-generic.service';

@Component({
    selector: 'app-entity-request-detail',
    templateUrl: 'entity-request-detail.component.html'
})
export class EntityRequestDetailComponent implements OnInit {

    entityRequest: EntityRequestTO;

    constructor(private httpGenericService: HttpGenericService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.httpGenericService.getByUrl<EntityRequestTO>(resolveUrlParam(this.route, URL_PARAM.BACKEND_URL))
            .subscribe(entityRequest => this.entityRequest = entityRequest);
    }

    makeTransition(link: LinkTO) {
        this.httpGenericService.putWithoutBody(link).subscribe(() => this.getData());
    }
}
