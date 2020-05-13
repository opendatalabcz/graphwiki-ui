import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '@core/components/base-component';
import {RoutingService} from '@core/services/routing.service';
import {map, startWith} from 'rxjs/operators';
import {RouteConstants} from '@core/constants/route-constants';
import {Observable} from 'rxjs';
import {GraphSettings, LayoutType} from '@graph-display/entities/graph-layout-config.entities';
import {GraphTOLinks} from '@graphwiki/graph-service-api';

@Component({
    selector: 'app-graph-display-settings',
    templateUrl: 'graph-display-settings.component.html'
})
export class GraphDisplaySettingsComponent extends BaseComponent implements OnInit {

    @Input()
    links: GraphTOLinks;
    @Input()
    settings: GraphSettings;

    LayoutType = LayoutType;
    locationBackwardAvailable: Observable<boolean>;

    constructor(public routingService: RoutingService) {
        super();
    }

    ngOnInit(): void {
        this.locationBackwardAvailable = this.routingService.locationBackwardUrl(true)
            .pipe(
                map(url => url && url.startsWith(RouteConstants.GRAPH_DISPLAY)),
                startWith(false)
            );
    }
}
