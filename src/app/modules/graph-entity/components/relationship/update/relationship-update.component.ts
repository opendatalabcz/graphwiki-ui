import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreateRelationshipTO, RelationshipTO} from '@graphwiki/graph-service-api';
import {HttpGenericService} from '@src/services/http-generic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {resolveUrlParam, URL_PARAM} from '@core/util/url-param-resolver';
import {RouteConstants} from '@core/constants/route-constants';
import {createRelationshipForm, fillRelationshipForm} from '@graph-entity/components/relationship/form/relationship-form-factory';

@Component({
    selector: 'app-relationship-update',
    templateUrl: 'relationship-update.component.html'
})
export class RelationshipUpdateComponent implements OnInit {

    relationshipForm: FormGroup;
    relationship: RelationshipTO;

    constructor(private http: HttpGenericService,
                private router: Router,
                private route: ActivatedRoute,
                fb: FormBuilder) {
        this.relationshipForm = createRelationshipForm(fb);
    }

    ngOnInit() {
        this.http.getByUrl<RelationshipTO>(resolveUrlParam(this.route, URL_PARAM.BACKEND_URL))
            .subscribe(relationship => {
                this.relationship = relationship;
                fillRelationshipForm(this.relationshipForm, relationship);
            });
    }

    update() {
        this.http.put(this.relationship.links.update, this.relationshipForm.getRawValue() as CreateRelationshipTO)
            .subscribe(() => this.router.navigate([RouteConstants.RELATIONSHIP_DETAIL, this.relationship.links.self.href])
            );
    }

    cancel() {
        this.router.navigate([RouteConstants.RELATIONSHIP_DETAIL, this.relationship.links.self.href]);
    }
}
