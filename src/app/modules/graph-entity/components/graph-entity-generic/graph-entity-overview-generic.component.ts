import {Component, ComponentFactoryResolver, Input, OnChanges, SimpleChanges, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {LinkTO} from '@core/entities/linkTO';
import {CompanyTO, PersonTO, RelationshipTO} from '@graphwiki/graph-service-api';
import {HttpGenericService} from '@src/services/http-generic.service';
import {PersonOverviewComponent} from '@graph-entity/components/person/overview/person-overview.component';
import {RelationshipOverviewComponent} from '@graph-entity/components/relationship/overview/relationship-overview.component';
import {GraphEntity} from '@core/entities/graph-entity.entities';
import {resolveGraphEntityByContentTypeFromGetRequest} from '@core/util/graph-entity-content-type-resolver';
import {CompanyOverviewComponent} from '@graph-entity/components/company/overview/company-overview.component';
import {GraphEntityOverviewParent} from '@graph-entity/components/graph-entity-parent/GraphEntityOverviewParent';

@Component({
    selector: 'app-graph-entity-overview-generic',
    template: '<ng-container #detailContainer></ng-container>'
})
export class GraphEntityOverviewGenericComponent implements OnChanges {

    @Input()
    link: LinkTO;
    @Input()
    header = 'OVERVIEW';
    @Input()
    headerByType: boolean;

    @ViewChild('detailContainer', {static: true, read: ViewContainerRef})
    detailContainer: ViewContainerRef;

    constructor(private httpGenericService: HttpGenericService,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.link) {
            this.getData();
        }
    }

    getData() {
        this.httpGenericService.getResponse<GraphEntity>(this.link).subscribe(response => {
            resolveGraphEntityByContentTypeFromGetRequest(response,
                person => this.showPerson(person),
                company => this.showCompany(company),
                relationship => this.showRelationship(relationship)
            );
        });
    }

    private showPerson(person: PersonTO) {
        this.createComponent(PersonOverviewComponent, person, 'PERSON');
    }

    private showCompany(company: CompanyTO) {
        this.createComponent(CompanyOverviewComponent, company, 'COMPANY');
    }

    private showRelationship(relationship: RelationshipTO) {
        this.createComponent(RelationshipOverviewComponent, relationship, 'RELATIONSHIP');
    }

    private createComponent<T extends GraphEntityOverviewParent<U>, U extends GraphEntity>(type: Type<T>, entity: U, headerType: string) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(type);
        this.detailContainer.clear();
        const componentRef = this.detailContainer.createComponent(componentFactory);
        componentRef.instance.header = this.headerByType ? headerType : this.header;
        componentRef.instance.entity = entity;
        componentRef.instance.headerLinkActive = true;
    }
}
