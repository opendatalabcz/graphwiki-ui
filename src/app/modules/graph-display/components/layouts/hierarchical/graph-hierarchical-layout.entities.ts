import * as shape from 'd3-shape';
import {EdgeTO, VertexTO} from '@graphwiki/graph-service-api';
import {Node} from '@swimlane/ngx-graph';
import {PipeTransform} from '@angular/core';
import {Edge} from '@swimlane/ngx-graph/lib/models/edge.model';
import {LayoutConfig, LayoutDefinition, LayoutType} from '@graph-display/entities/graph-layout-config.entities';


export class HierarchicalLayoutDefinition22222 implements LayoutDefinition {
    layout = LayoutType.HIERARCHICAL;
    /**
     * @see @swimlane/ngx-graph/lib/graph/layouts/dagre#DagreSettings
     */
    layoutSettings = {
        orientation: 'LR',
        marginX: 100,
        marginY: 100,
        nodePadding: 100
    };
    curve = shape.curveBundle;
    config = new HierarchicalLayoutConfig22222(this.graphEntityIdNormalizerPipe);

    constructor(private graphEntityIdNormalizerPipe: PipeTransform) {
    }
}


class HierarchicalLayoutConfig22222 implements LayoutConfig {
    iconSize = 24;
    private nodeSize = 100;

    constructor(private graphEntityIdNormalizerPipe: PipeTransform) {
    }

    vertexMapper(vertices: VertexTO[]): Node[] {
        return vertices.map(node => {
            const mappedNode: Node = {
                id: node.id,
                label: node.label,
                data: node,
                dimension: {width: this.nodeSize, height: this.nodeSize}
            };
            return mappedNode;
        });
    }

    edgeMapper(edges: EdgeTO[]): Edge[] {
        return edges.map(edge => {
            const mappedEdge: Edge = {
                id: this.graphEntityIdNormalizerPipe.transform(edge.id),
                label: edge.label,
                source: edge.source,
                target: edge.target,
                data: edge
            };
            return mappedEdge;
        });
    }
}
