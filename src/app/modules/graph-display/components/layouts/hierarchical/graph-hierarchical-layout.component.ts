import {Component, OnChanges} from '@angular/core';
import {GraphLayout} from '@graph-display/components/layouts/graph-layout';
import {HttpGenericService} from '@src/services/http-generic.service';
import {Router} from '@angular/router';
import {HierarchicalLayoutDefinition22222} from './graph-hierarchical-layout.entities';
import {GraphEntityIdNormalizerPipe} from '@graph-display/pipe/graph-entity-id-normalizer.pipe';

@Component({
    selector: 'app-graph-hierarchical-layout',
    templateUrl: 'graph-hierarchical-layout.component.html',
    styleUrls: ['../graph-layout.scss']
})
export class GraphHierarchicalLayoutComponent extends GraphLayout implements OnChanges {

    constructor(httpGenericService: HttpGenericService,
                router: Router,
                graphEntityIdNormalizerPipe: GraphEntityIdNormalizerPipe) {
        super(httpGenericService, router, new HierarchicalLayoutDefinition22222(graphEntityIdNormalizerPipe));
    }
}
