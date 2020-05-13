import {ReplaySubject, Subject} from 'rxjs';
import {LinkTO} from '@core/entities/linkTO';
import {EdgeTO, VertexTO, VertexType} from '@graphwiki/graph-service-api';
import {Node} from '@swimlane/ngx-graph';
import {Edge} from '@swimlane/ngx-graph/lib/models/edge.model';

export enum LayoutType {
    HIERARCHICAL = 'dagre',
    ORGANICAL = 'colaForceDirected'
}

export interface LayoutConfig {
    iconSize: number;

    vertexMapper(vertices: VertexTO[]): Node[];

    edgeMapper(edges: EdgeTO[]): Edge[];
}

export interface LayoutDefinition {
    layout: LayoutType;
    layoutSettings?: any;
    curve: any;
    config: LayoutConfig;
}

interface UserInteraction {
    zoomSpeed: number;
    draggingEnabled: boolean;
    panningEnabled: boolean;
    zoomEnabled: boolean;
    panOnZoom: boolean;
    autoZoom: boolean;
    autoCenter: boolean;
    refreshSubject: Subject<boolean>;
    centerSubject: Subject<boolean>;
    zoomToFitSubject: Subject<boolean>;
}

interface UserActions {
    search: Subject<LinkTO>;
    export: Subject<LinkTO>;
}

interface GraphMetadata {
    iconResolver: (vertexType: VertexType) => string;
}

export interface GraphSettings {
    layoutTypeSubject: ReplaySubject<LayoutType>;
    userInteraction: UserInteraction;
    actions: UserActions;
    graphMetadata: GraphMetadata;

    setLayout(layoutType: LayoutType);
}

export class DefaultGraphSettings implements GraphSettings {
    layoutTypeSubject: ReplaySubject<LayoutType> = new ReplaySubject<LayoutType>();
    userInteraction: UserInteraction = {
        draggingEnabled: false,
        panningEnabled: true,
        zoomEnabled: true,
        zoomSpeed: 0.1,
        panOnZoom: false,
        autoZoom: true,
        autoCenter: true,
        refreshSubject: new Subject<boolean>(),
        centerSubject: new Subject<boolean>(),
        zoomToFitSubject: new Subject<boolean>()
    };
    actions: UserActions = {
        search: new Subject<LinkTO>(),
        export: new Subject<LinkTO>()
    };
    graphMetadata: GraphMetadata = {
        iconResolver: vertexType => {
            switch (vertexType) {
                case VertexType.PERSON:
                    return '/assets/svg-icons/icon_person.svg';
                case VertexType.COMPANY:
                    return '/assets/svg-icons/icon_company.svg';
                default:
                    throw Error(`Invalid vertex type ${vertexType}`);
            }
        }
    };

    setLayout(layoutType: LayoutType) {
        this.layoutTypeSubject.next(layoutType);
    }

    constructor() {
        this.setLayout(LayoutType.HIERARCHICAL);
    }
}
