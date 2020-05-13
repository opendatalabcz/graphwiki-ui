import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RelationshipDetailComponent} from './components/relationship/detail/relationship-detail.component';
import {CompanyDetailComponent} from './components/company/detail/company-detail.component';
import {PersonDetailComponent} from './components/person/detail/person-detail.component';
import {CompanyNewComponent} from './components/company/new/company-new.component';
import {RelationshipNewComponent} from './components/relationship/new/relationship-new.component';
import {PersonNewComponent} from './components/person/new/person-new.component';
import {NavigationPanelLayoutComponent} from '@layout/components/layout/navigation-panel-layout/navigation-panel-layout.component';
import {GraphEntityDetailGenericComponent} from '@graph-entity/components/graph-entity-generic/graph-entity-detail-generic.component';
import {ComplaintDetailComponent} from '@graph-entity/components/related-entity/complaint/detail/complaint-detail.component';
import {ComplaintNewComponent} from '@graph-entity/components/related-entity/complaint/new/complaint-new.component';
import {EntityRequestDetailComponent} from '@graph-entity/components/related-entity/entity-request/entity-request-detail.component';
import {PersonUpdateComponent} from '@graph-entity/components/person/update/person-update.component';
import {CompanyUpdateComponent} from '@graph-entity/components/company/update/company-update.component';
import {RelationshipUpdateComponent} from '@graph-entity/components/relationship/update/relationship-update.component';

const graphEntityModuleRoutes: Routes = [
    {
        path: '',
        component: NavigationPanelLayoutComponent,
        children: [
            {path: 'generic/:url', component: GraphEntityDetailGenericComponent},
            {path: 'person/new/:url', component: PersonNewComponent},
            {path: 'person/update/:url', component: PersonUpdateComponent},
            {path: 'person/:url', component: PersonDetailComponent},
            {path: 'company/new/:url', component: CompanyNewComponent},
            {path: 'company/update/:url', component: CompanyUpdateComponent},
            {path: 'company/:url', component: CompanyDetailComponent},
            {path: 'relationship/new/:url', component: RelationshipNewComponent},
            {path: 'relationship/update/:url', component: RelationshipUpdateComponent},
            {path: 'relationship/:url', component: RelationshipDetailComponent},
            {path: 'request/:url', component: EntityRequestDetailComponent},
            {path: 'complaint/:url', component: ComplaintDetailComponent},
            {path: 'complaint/new/:url', component: ComplaintNewComponent}
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(graphEntityModuleRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class GraphEntityRoutingModule {
}
