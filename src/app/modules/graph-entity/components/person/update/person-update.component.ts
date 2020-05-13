import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpGenericService} from '@src/services/http-generic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {resolveUrlParam, URL_PARAM} from '@core/util/url-param-resolver';
import {createPersonForm, fillPersonForm} from '@graph-entity/components/person/form/person-form-factory';
import {CreatePersonTO, PersonTO} from '@graphwiki/graph-service-api';
import {RouteConstants} from '@core/constants/route-constants';

@Component({
    selector: 'app-person-update',
    templateUrl: './person-update.component.html'
})
export class PersonUpdateComponent implements OnInit {

    personForm: FormGroup;
    person: PersonTO;

    constructor(private http: HttpGenericService,
                private router: Router,
                private route: ActivatedRoute,
                fb: FormBuilder) {
        this.personForm = createPersonForm(fb);
    }

    ngOnInit() {
        this.http.getByUrl<PersonTO>(resolveUrlParam(this.route, URL_PARAM.BACKEND_URL))
            .subscribe(person => {
                this.person = person;
                fillPersonForm(this.personForm, person);
            });
    }

    update() {
        this.http.put(this.person.links.update, this.personForm.getRawValue() as CreatePersonTO)
            .subscribe(() => this.router.navigate([RouteConstants.PERSON_DETAIL, this.person.links.self.href])
            );
    }

    cancel() {
        this.router.navigate([RouteConstants.PERSON_DETAIL, this.person.links.self.href]);
    }
}
