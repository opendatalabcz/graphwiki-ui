import {Component} from '@angular/core';
import {GraphLayout} from '@graph-display/components/layouts/graph-layout';
import {HttpGenericService} from '@src/services/http-generic.service';
import {Router} from '@angular/router';
import {OrganicalLayoutDefinition} from './graph-organical-layout.entities';
import {GraphEntityIdNormalizerPipe} from '@graph-display/pipe/graph-entity-id-normalizer.pipe';
import {OrganicalLayout} from './OrganicalLayout';

@Component({
    selector: 'app-graph-organical-layout',
    templateUrl: 'graph-organical-layout.component.html',
    styleUrls: ['../graph-layout.scss']
})
export class GraphOrganicalLayoutComponent extends GraphLayout {

    organicalLayout = new OrganicalLayout();

    constructor(httpGenericService: HttpGenericService,
                router: Router,
                graphEntityIdNormalizerPipe: GraphEntityIdNormalizerPipe) {
        super(httpGenericService, router, new OrganicalLayoutDefinition(graphEntityIdNormalizerPipe));
    }
}
