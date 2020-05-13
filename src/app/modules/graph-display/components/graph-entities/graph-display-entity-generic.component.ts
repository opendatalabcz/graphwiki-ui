import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    OnChanges,
    SimpleChanges,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {LinkTO} from '@core/entities/linkTO';
import {CompanyTO, PersonTO, RelationshipTO} from '@graphwiki/graph-service-api';
import {HttpGenericService} from '@src/services/http-generic.service';
import {GraphDisplayPersonComponent} from './person/graph-display-person.component';
import {GraphDisplayCompanyComponent} from './company/graph-display-company.component';
import {GraphDisplayRelationshipComponent} from './relationship/graph-display-relationship.component';
import {GraphDisplayEntityParent} from './graph-display-entity-parent';
import {resolveGraphEntityByContentTypeFromGetRequest} from '@core/util/graph-entity-content-type-resolver';
import {GraphEntity} from '@core/entities/graph-entity.entities';

@Component({
    selector: 'app-graph-display-entity-generic',
    template: '<ng-container #detailContainer></ng-container>'
})
export class GraphDisplayEntityGenericComponent implements OnChanges {

    @Input()
    link: LinkTO;
    @Input()
    vertexActive = false;

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
        const componentRef = this.createComponent(GraphDisplayPersonComponent);
        componentRef.instance.entity = person;
        componentRef.instance.active = this.vertexActive;
    }

    private showCompany(company: CompanyTO) {
        const componentRef = this.createComponent(GraphDisplayCompanyComponent);
        componentRef.instance.entity = company;
        componentRef.instance.active = this.vertexActive;
    }

    private showRelationship(relationship: RelationshipTO) {
        const componentRef = this.createComponent(GraphDisplayRelationshipComponent);
        componentRef.instance.entity = relationship;
    }

    private createComponent<T extends GraphDisplayEntityParent<any>>(type: Type<T>): ComponentRef<T> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(type);
        this.detailContainer.clear();
        return this.detailContainer.createComponent(componentFactory);
    }
}
