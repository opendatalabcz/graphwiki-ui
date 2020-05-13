import * as shape from 'd3-shape';
import {EdgeTO, VertexTO} from '@graphwiki/graph-service-api';
import {Node} from '@swimlane/ngx-graph';
import {PipeTransform} from '@angular/core';
import {Edge} from '@swimlane/ngx-graph/lib/models/edge.model';
import {LayoutConfig, LayoutDefinition, LayoutType} from '@graph-display/entities/graph-layout-config.entities';

export class OrganicalLayoutDefinition implements LayoutDefinition {
    layout = LayoutType.ORGANICAL;
    curve = shape.curveBundle;
    config = new OrganicalLayoutConfig(this.graphEntityIdNormalizerPipe);

    constructor(private graphEntityIdNormalizerPipe: PipeTransform) {
    }
}

class OrganicalLayoutConfig implements LayoutConfig {
    iconSize = 24;
    nodeSize = 60;

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
                data: edge,
                textAngle: 180
            };
            return mappedEdge;
        });
    }
}
