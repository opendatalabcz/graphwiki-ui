import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreateCompanyTO} from '@graphwiki/graph-service-api';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpGenericService} from '@src/services/http-generic.service';
import {InitService} from '@src/routing/InitService';
import {resolveUrlParam, URL_PARAM} from '@core/util/url-param-resolver';
import {createCompanyForm} from '@graph-entity/components/company/form/company-form-factory';

@Component({
    selector: 'app-company-new',
    templateUrl: 'company-new.component.html'
})
export class CompanyNewComponent {

    companyForm: FormGroup;
    createLinkHref: string;
    companyCreated = false;

    constructor(private httpGenericService: HttpGenericService,
                private router: Router,
                private initService: InitService,
                route: ActivatedRoute,
                fb: FormBuilder) {
        this.createLinkHref = resolveUrlParam(route, URL_PARAM.BACKEND_URL);
        this.companyForm = createCompanyForm(fb);
    }

    create() {
        this.httpGenericService.postByUrl<CreateCompanyTO>(this.createLinkHref, this.companyForm.getRawValue() as CreateCompanyTO)
            .subscribe(() => {
                    this.companyCreated = true;
                    this.companyForm.reset();
                }
            );
    }
}
