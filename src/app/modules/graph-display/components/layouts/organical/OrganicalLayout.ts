import {d3adaptor, Group, InputNode, Rectangle} from 'webcola';
import * as d3Dispatch from 'd3-dispatch';
import * as d3Force from 'd3-force';
import * as d3Timer from 'd3-timer';
import {Observable, Subject} from 'rxjs';
import {ClusterNode, Edge, Graph, Layout} from '@swimlane/ngx-graph';
import {ColaForceDirectedSettings, ColaGraph} from '@swimlane/ngx-graph/lib/graph/layouts/colaForceDirected';

export class OrganicalLayout implements Layout {
    defaultSettings: ColaForceDirectedSettings = {
        force: d3adaptor({
            ...d3Dispatch,
            ...d3Force,
            ...d3Timer
        } as any)
            .linkDistance(220)
            .defaultNodeSize(100)
            .avoidOverlaps(true),
        viewDimensions: {
            width: 600,
            height: 600,
            xOffset: 0
        }
    };
    settings: ColaForceDirectedSettings = {};

    inputGraph: Graph;
    outputGraph: Graph;
    internalGraph: ColaGraph & { groupLinks?: Edge[] };
    outputGraph$: Subject<Graph> = new Subject();

    run(graph: Graph): Observable<Graph> {
        this.inputGraph = graph;
        if (!this.inputGraph.clusters) {
            this.inputGraph.clusters = [];
        }
        this.internalGraph = {
            nodes: [
                ...this.inputGraph.nodes.map(n => ({
                    ...n,
                    width: n.dimension ? n.dimension.width : 20,
                    height: n.dimension ? n.dimension.height : 20
                }))
            ] as any,
            groups: [
                ...this.inputGraph.clusters.map(
                    (cluster): Group => ({
                        padding: 5,
                        groups: cluster.childNodeIds
                            .map(nodeId => this.inputGraph.clusters.findIndex(node => node.id === nodeId))
                            .filter(x => x >= 0) as any,
                        leaves: cluster.childNodeIds
                            .map(nodeId => this.inputGraph.nodes.findIndex(node => node.id === nodeId))
                            .filter(x => x >= 0) as any
                    })
                )
            ],
            links: [
                ...this.inputGraph.edges
                    .map(e => {
                        const sourceNodeIndex = this.inputGraph.nodes.findIndex(node => e.source === node.id);
                        const targetNodeIndex = this.inputGraph.nodes.findIndex(node => e.target === node.id);
                        if (sourceNodeIndex === -1 || targetNodeIndex === -1) {
                            return undefined;
                        }
                        return {
                            ...e,
                            source: sourceNodeIndex,
                            target: targetNodeIndex
                        };
                    })
                    .filter(x => !!x)
            ] as any,
            groupLinks: [
                ...this.inputGraph.edges
                    .map(e => {
                        const sourceNodeIndex = this.inputGraph.nodes.findIndex(node => e.source === node.id);
                        const targetNodeIndex = this.inputGraph.nodes.findIndex(node => e.target === node.id);
                        if (sourceNodeIndex >= 0 && targetNodeIndex >= 0) {
                            return undefined;
                        }
                        return e;
                    })
                    .filter(x => !!x)
            ]
        };
        this.outputGraph = {
            nodes: [],
            clusters: [],
            edges: [],
            edgeLabels: []
        };
        this.outputGraph$.next(this.outputGraph);
        this.settings = Object.assign({}, this.defaultSettings, this.settings);
        if (this.settings.force) {
            this.settings.force = this.settings.force
                .nodes(this.internalGraph.nodes)
                .groups(this.internalGraph.groups)
                .links(this.internalGraph.links)
                .alpha(0.5)
                .on('tick', () => {
                    if (this.settings.onTickListener) {
                        this.settings.onTickListener(this.internalGraph);
                    }
                    this.outputGraph$.next(this.internalGraphToOutputGraph(this.internalGraph));
                });
            if (this.settings.viewDimensions) {
                this.settings.force = this.settings.force.size([
                    this.settings.viewDimensions.width,
                    this.settings.viewDimensions.height
                ]);
            }
            if (this.settings.forceModifierFn) {
                this.settings.force = this.settings.forceModifierFn(this.settings.force);
            }
            this.settings.force.start();
        }

        return this.outputGraph$.asObservable();
    }

    updateEdge(graph: Graph, edge: Edge): Observable<Graph> {
        const settings = Object.assign({}, this.defaultSettings, this.settings);
        if (settings.force) {
            settings.force.start();
        }

        return this.outputGraph$.asObservable();
    }

    internalGraphToOutputGraph(internalGraph: any): Graph {
        this.outputGraph.nodes = internalGraph.nodes.map(node => ({
            ...node,
            id: node.id,
            position: {
                x: node.x,
                y: node.y
            },
            dimension: {
                width: (node.dimension && node.dimension.width) || 20,
                height: (node.dimension && node.dimension.height) || 20
            },
            transform: `translate(${node.x - ((node.dimension && node.dimension.width) || 20) / 2 || 0}, ${node.y -
            ((node.dimension && node.dimension.height) || 20) / 2 || 0})`
        }));

        this.outputGraph.edges = internalGraph.links
            .map(edge => {
                const source: any = toNode(internalGraph.nodes, edge.source);
                const target: any = toNode(internalGraph.nodes, edge.target);
                return {
                    ...edge,
                    source: source.id,
                    target: target.id,
                    points: [
                        (source.bounds as Rectangle).rayIntersection(target.bounds.cx(), target.bounds.cy()),
                        (target.bounds as Rectangle).rayIntersection(source.bounds.cx(), source.bounds.cy())
                    ]
                };
            })
            .concat(
                internalGraph.groupLinks.map(groupLink => {
                    const sourceNode = internalGraph.nodes.find(foundNode => (foundNode as any).id === groupLink.source);
                    const targetNode = internalGraph.nodes.find(foundNode => (foundNode as any).id === groupLink.target);
                    const source =
                        sourceNode || internalGraph.groups.find(foundGroup => (foundGroup as any).id === groupLink.source);
                    const target =
                        targetNode || internalGraph.groups.find(foundGroup => (foundGroup as any).id === groupLink.target);
                    return {
                        ...groupLink,
                        source: source.id,
                        target: target.id,
                        points: [
                            (source.bounds as Rectangle).rayIntersection(target.bounds.cx(), target.bounds.cy()),
                            (target.bounds as Rectangle).rayIntersection(source.bounds.cx(), source.bounds.cy())
                        ]
                    };
                })
            );

        this.outputGraph.clusters = internalGraph.groups.map(
            (group, index): ClusterNode => {
                const inputGroup = this.inputGraph.clusters[index];
                return {
                    ...inputGroup,
                    dimension: {
                        width: group.bounds ? group.bounds.width() : 20,
                        height: group.bounds ? group.bounds.height() : 20
                    },
                    position: {
                        x: group.bounds ? group.bounds.x + group.bounds.width() / 2 : 0,
                        y: group.bounds ? group.bounds.y + group.bounds.height() / 2 : 0
                    }
                };
            }
        );
        this.outputGraph.edgeLabels = this.outputGraph.edges;
        return this.outputGraph;
    }
}

export function toNode(nodes: InputNode[], nodeRef: InputNode | number): InputNode {
    if (typeof nodeRef === 'number') {
        return nodes[nodeRef];
    }
    return nodeRef;
}
