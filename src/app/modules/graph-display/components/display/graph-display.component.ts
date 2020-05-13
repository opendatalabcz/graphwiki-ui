import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DefaultGraphSettings, GraphSettings, LayoutType} from '@graph-display/entities/graph-layout-config.entities';
import {GraphTO} from '@graphwiki/graph-service-api';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteConstants} from '@core/constants/route-constants';
import {ExportService} from '@graph-display/service/export.service';
import {resolveUrlParamObservable, URL_PARAM} from '@core/util/url-param-resolver';
import {BaseComponent} from '@core/components/base-component';
import {HttpGenericService} from '@src/services/http-generic.service';
import {GraphDisplayEntity} from '@graph-display/entities/graph-display.entities';

@Component({
    selector: 'app-graph-display',
    templateUrl: 'graph-display.component.html',
    styleUrls: ['graph-display.component.scss']
})
export class GraphDisplayComponent extends BaseComponent implements OnInit {

    @ViewChild('detailContainer', {static: true, read: ViewContainerRef})
    detailContainer: ViewContainerRef;

    LayoutType = LayoutType;
    RouteConstants = RouteConstants;
    graph: GraphTO;
    settings: GraphSettings;
    selectedGraphDisplayEntity: GraphDisplayEntity = null;

    constructor(private httpGenericService: HttpGenericService,
                private exportService: ExportService,
                private router: Router,
                private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.settings = new DefaultGraphSettings();

        this.subscriptions.push(
            resolveUrlParamObservable(this.route, URL_PARAM.BACKEND_URL).subscribe(url => this.getData(url)),
            this.settings.actions.search.subscribe(link => this.router.navigate([RouteConstants.GRAPH_DISPLAY, link.href])),
            this.settings.actions.export.subscribe(link => this.exportService.export(link))
        );
    }

    getData(url: string) {
        this.httpGenericService.getByUrl<GraphTO>(url)
            .subscribe(graph => {
                this.graph = graph;
                this.selectGraphDisplayEntity(graph.rootNode);
            });
    }

    selectGraphDisplayEntity(entity: GraphDisplayEntity) {
        this.selectedGraphDisplayEntity = entity;
    }
}
