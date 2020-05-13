import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreateRelationshipTO,} from '@graphwiki/graph-service-api';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpGenericService} from '@src/services/http-generic.service';
import {InitService} from '@src/routing/InitService';
import {resolveUrlParam, URL_PARAM} from '@core/util/url-param-resolver';
import {createRelationshipForm} from '@graph-entity/components/relationship/form/relationship-form-factory';
import {RelationshipFormComponent} from '@graph-entity/components/relationship/form/relationship-form.component';

@Component({
    selector: 'app-relationship-new',
    templateUrl: 'relationship-new.component.html'
})
export class RelationshipNewComponent {

    @ViewChild(RelationshipFormComponent, {static: false})
    formComponent: RelationshipFormComponent;

    relationshipForm: FormGroup;
    createLinkHref: string;
    relationshipCreated = false;

    constructor(private httpGenericService: HttpGenericService,
                private router: Router,
                private initService: InitService,
                route: ActivatedRoute,
                fb: FormBuilder) {
        this.createLinkHref = resolveUrlParam(route, URL_PARAM.BACKEND_URL);
        this.relationshipForm = createRelationshipForm(fb);
    }

    create() {
        this.httpGenericService.postByUrl<CreateRelationshipTO>(
            this.createLinkHref,
            this.relationshipForm.getRawValue() as CreateRelationshipTO
        ).subscribe(() => {
                this.relationshipCreated = true;
                this.relationshipForm.reset();
                this.formComponent.reset();
            }
        );
    }
}
