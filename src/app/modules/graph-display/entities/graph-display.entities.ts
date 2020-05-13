import {EdgeTO, VertexTO} from '@graphwiki/graph-service-api';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

export declare type GraphDisplayEntity = VertexTO | EdgeTO;

export interface VertexTooltipContext {
    vertex: VertexTO;
    tooltipTrigger: NgbTooltip;
}
