import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphDisplayRoutingModule} from './graph-display-routing.module';
import {GraphDisplayComponent} from './components/display/graph-display.component';
import {CoreModule} from '@core/core.module';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule, MatTooltipModule} from '@angular/material';
import {TooltipModule} from '@swimlane/ngx-charts';
import {GraphEntityIdNormalizerPipe} from './pipe/graph-entity-id-normalizer.pipe';
import {GraphHierarchicalLayoutComponent} from './components/layouts/hierarchical/graph-hierarchical-layout.component';
import {GraphOrganicalLayoutComponent} from './components/layouts/organical/graph-organical-layout.component';
import {GraphDisplaySettingsComponent} from './components/settings/graph-display-settings.component';
import {GraphDisplayPersonComponent} from './components/graph-entities/person/graph-display-person.component';
import {GraphDisplayCompanyComponent} from './components/graph-entities/company/graph-display-company.component';
import {GraphDisplayRelationshipComponent} from './components/graph-entities/relationship/graph-display-relationship.component';
import {GraphDisplayEntityGenericComponent} from './components/graph-entities/graph-display-entity-generic.component';
import {LayoutModule} from '@layout/layout.module';
import {ExportService} from '@graph-display/service/export.service';

const matModules = [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule
];

const entryComponents = [
    GraphDisplayPersonComponent,
    GraphDisplayCompanyComponent,
    GraphDisplayRelationshipComponent
];

@NgModule({
    declarations: [
        GraphDisplayComponent,
        GraphHierarchicalLayoutComponent,
        GraphOrganicalLayoutComponent,
        GraphEntityIdNormalizerPipe,
        GraphDisplaySettingsComponent,

        GraphDisplayEntityGenericComponent,
        ...entryComponents
    ],
    imports: [
        CommonModule,

        GraphDisplayRoutingModule,
        CoreModule,
        LayoutModule,

        ...matModules,

        NgxGraphModule,
        TooltipModule,
        NgbTooltipModule,
    ],
    providers: [
        GraphEntityIdNormalizerPipe,
        ExportService
    ],
    entryComponents: [
        ...entryComponents
    ]
})
export class GraphDisplayModule {
}
