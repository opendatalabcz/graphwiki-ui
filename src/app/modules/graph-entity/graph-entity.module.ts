import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '@core/core.module';
import {CompanyDetailComponent} from './components/company/detail/company-detail.component';
import {GraphEntityOverviewGenericComponent} from './components/graph-entity-generic/graph-entity-overview-generic.component';
import {PersonDetailComponent} from './components/person/detail/person-detail.component';
import {PersonOverviewComponent} from './components/person/overview/person-overview.component';
import {RelationshipDetailComponent} from './components/relationship/detail/relationship-detail.component';
import {RelationshipOverviewComponent} from './components/relationship/overview/relationship-overview.component';
import {GraphEntityRoutingModule} from './graph-entity-routing.module';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {PersonNewComponent} from './components/person/new/person-new.component';
import {CompanyNewComponent} from './components/company/new/company-new.component';
import {AddressFormComponent} from './components/company/new/address-form/address-form.component';
import {RelationshipNewComponent} from './components/relationship/new/relationship-new.component';
import {HistoryModule} from '@history/history.module';
import {CommentModule} from '@comment/comment.module';
import {GenderSalutationPipe} from '@core/pipes/gender-salutation.pipe';
import {SearchModule} from '@search/search.module';
import {CompanyOverviewComponent} from './components/company/overview/company-overview.component';
import {LayoutModule} from '@layout/layout.module';
import {EntityRequestStateBadgePipe} from './pipe/entity-request-state-badge.pipe';
import {GraphEntityDetailGenericComponent} from '@graph-entity/components/graph-entity-generic/graph-entity-detail-generic.component';
import {ComplaintStateBadgePipe} from '@graph-entity/pipe/complaint-state-badge.pipe';
import {ComplaintDetailComponent} from '@graph-entity/components/related-entity/complaint/detail/complaint-detail.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MomentModule} from 'ngx-moment';
import {RelationshipRelatedComponent} from '@graph-entity/components/relationship/related/relationship-related.component';
import {RelationshipRelatedListComponent} from '@graph-entity/components/relationship/related/list/relationship-related-list.component';
import {ComplaintNewComponent} from '@graph-entity/components/related-entity/complaint/new/complaint-new.component';
import {ComplaintRelatedListComponent} from '@graph-entity/components/related-entity/complaint/related/list/complaint-related-list.component';
import {ComplaintRelatedComponent} from '@graph-entity/components/related-entity/complaint/related/complaint-related.component';
import {EntityRequestDetailComponent} from '@graph-entity/components/related-entity/entity-request/entity-request-detail.component';
import {TaskButtonsComponent} from './components/related-entity/task-buttons/task-buttons.component';
import {PersonFormComponent} from '@graph-entity/components/person/form/person-form.component';
import {PersonUpdateComponent} from './components/person/update/person-update.component';
import {CompanyFormComponent} from './components/company/form/company-form.component';
import {CompanyUpdateComponent} from './components/company/update/company-update.component';
import {RelationshipFormComponent} from './components/relationship/form/relationship-form.component';
import {RelationshipUpdateComponent} from './components/relationship/update/relationship-update.component';
import {EntityCreatedInfoMessageComponent} from '@graph-entity/components/entity-created-info-message/entity-created-info-message.component';

const matModules = [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule
];

const person = [
    PersonNewComponent,
    PersonDetailComponent,
    PersonOverviewComponent,
    PersonFormComponent,
    PersonUpdateComponent
];

const company = [
    CompanyNewComponent,
    AddressFormComponent,
    CompanyDetailComponent,
    CompanyOverviewComponent,
    CompanyFormComponent,
    CompanyUpdateComponent
];

const relationship = [
    RelationshipNewComponent,
    RelationshipDetailComponent,
    RelationshipOverviewComponent,
    RelationshipRelatedComponent,
    RelationshipRelatedListComponent,
    RelationshipFormComponent,
    RelationshipUpdateComponent
];

const entityRequest = [
    EntityRequestDetailComponent,
    EntityRequestStateBadgePipe
];

const complaint = [
    ComplaintStateBadgePipe,
    ComplaintDetailComponent,
    ComplaintNewComponent,
    ComplaintRelatedComponent,
    ComplaintRelatedListComponent
];

const exports = [
    GraphEntityOverviewGenericComponent,
    GraphEntityDetailGenericComponent
];

@NgModule({
    declarations: [
        ...exports,
        ...person,
        ...company,
        ...relationship,
        ...entityRequest,
        ...complaint,
        TaskButtonsComponent,
        EntityCreatedInfoMessageComponent
    ],
    exports: [
        ...exports
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        GraphEntityRoutingModule,
        CoreModule,
        LayoutModule,
        SearchModule,
        CommentModule,
        HistoryModule,

        ...matModules,

        MomentModule,
        MatTooltipModule
    ],
    providers: [
        GenderSalutationPipe
    ],
    entryComponents: [
        PersonOverviewComponent,
        CompanyOverviewComponent,
        RelationshipOverviewComponent
    ]
})
export class GraphEntityModule {
}
