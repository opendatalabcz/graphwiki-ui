import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpGenericService} from '@src/services/http-generic.service';
import {resolveGraphEntityByContentTypeFromHeadRequest} from '@core/util/graph-entity-content-type-resolver';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteConstants} from '@core/constants/route-constants';
import {resolveUrlParam, URL_PARAM} from '@core/util/url-param-resolver';

@Component({
    selector: 'app-graph-entity-detail-generic',
    template: ''
})
export class GraphEntityDetailGenericComponent implements OnInit {

    @ViewChild('detailContainer', {static: true, read: ViewContainerRef})
    detailContainer: ViewContainerRef;

    constructor(private httpGenericService: HttpGenericService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.routeToDetail(resolveUrlParam(this.route, URL_PARAM.BACKEND_URL));
    }

    routeToDetail(url: string) {
        this.httpGenericService.headByUrl(url).subscribe(response => {
            resolveGraphEntityByContentTypeFromHeadRequest(response,
                () => this.router.navigate([RouteConstants.PERSON_DETAIL, url], {replaceUrl: true}),
                () => this.router.navigate([RouteConstants.COMPANY_DETAIL, url], {replaceUrl: true}),
                () => this.router.navigate([RouteConstants.RELATIONSHIP_DETAIL, url], {replaceUrl: true})
            );
        });
    }
}
