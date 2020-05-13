import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreatePersonTO} from '@graphwiki/graph-service-api';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpGenericService} from '@src/services/http-generic.service';
import {resolveUrlParam, URL_PARAM} from '@core/util/url-param-resolver';
import {createPersonForm} from '@graph-entity/components/person/form/person-form-factory';

@Component({
    selector: 'app-person-new',
    templateUrl: 'person-new.component.html'
})
export class PersonNewComponent {

    personForm: FormGroup;
    createLinkHref: string;
    personCreated = false;

    constructor(private http: HttpGenericService,
                private router: Router,
                route: ActivatedRoute,
                private fb: FormBuilder) {
        this.createLinkHref = resolveUrlParam(route, URL_PARAM.BACKEND_URL);
        this.personForm = createPersonForm(fb);
    }

    create() {
        this.http.postByUrl<CreatePersonTO>(this.createLinkHref, this.personForm.getRawValue() as CreatePersonTO)
            .subscribe(() => {
                this.personCreated = true;
                this.personForm.reset();
            });
    }
}
