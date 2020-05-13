import {EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {EdgeTO, GraphTO, VertexTO} from '@graphwiki/graph-service-api';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {GraphDisplayEntity, VertexTooltipContext} from '@graph-display/entities/graph-display.entities';
import {Edge, Node} from '@swimlane/ngx-graph';
import {RouteConstants} from '@core/constants/route-constants';
import {StyleTypes} from '@swimlane/ngx-charts/release/common/tooltip/style.type';
import {PlacementTypes} from '@swimlane/ngx-charts/release/common/tooltip/position';
import {HttpGenericService} from '@src/services/http-generic.service';
import {Router} from '@angular/router';
import {GraphSettings, LayoutDefinition} from '@graph-display/entities/graph-layout-config.entities';

export abstract class GraphLayout implements OnChanges {

    @Input()
    settings: GraphSettings;
    @Input()
    graph: GraphTO;
    @Output()
    selectEntity = new EventEmitter<GraphDisplayEntity>();

    StyleTypes = StyleTypes;
    PlacementTypes = PlacementTypes;
    RouteConstants = RouteConstants;
    nodes: Node[];
    edges: Edge[];
    layoutDefinition: LayoutDefinition;

    constructor(private httpGenericService: HttpGenericService,
                private router: Router,
                layoutDefinition: LayoutDefinition) {
        this.layoutDefinition = layoutDefinition;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.graph) {
            this.nodes = this.layoutDefinition.config.vertexMapper(this.graph.nodes);
            this.edges = this.layoutDefinition.config.edgeMapper(this.graph.edges);
        }
    }

    search(context: VertexTooltipContext) {
        this.hideTooltip(context.tooltipTrigger);
        this.router.navigate([RouteConstants.GRAPH_DISPLAY, context.vertex.links.graph.href]);
    }

    selectVertex(vertex: VertexTO, tooltipTrigger: NgbTooltip = null) {
        this.openTooltip(vertex, tooltipTrigger);
        this.selectEntity.emit(vertex);
    }

    selectRelationship(edge: EdgeTO) {
        this.selectEntity.emit(edge);
    }

    openTooltip(vertex: VertexTO, tooltipTrigger: NgbTooltip) {
        if (tooltipTrigger) {
            if (tooltipTrigger.isOpen()) {
                tooltipTrigger.close();
            } else {
                const context: VertexTooltipContext = {vertex, tooltipTrigger};
                tooltipTrigger.open({context});
            }
        }
    }

    hideTooltip(tooltipTrigger: NgbTooltip) {
        if (tooltipTrigger.isOpen()) {
            tooltipTrigger.close();
        }
    }

    isActive(node: Node): boolean {
        return this.castNodeData(node).id === this.graph.rootNode.id;
    }

    castTemplateContext(context: VertexTooltipContext): VertexTooltipContext {
        return context as VertexTooltipContext;
    }

    castNode(node: Node): Node {
        return node as Node;
    }

    castNodeData(node: Node): VertexTO {
        return node.data as VertexTO;
    }
}
