import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CompanyTO, CreateCompanyTO} from '@graphwiki/graph-service-api';
import {HttpGenericService} from '@src/services/http-generic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {resolveUrlParam, URL_PARAM} from '@core/util/url-param-resolver';
import {RouteConstants} from '@core/constants/route-constants';
import {createCompanyForm, fillCompanyForm} from '@graph-entity/components/company/form/company-form-factory';

@Component({
    selector: 'app-company-update',
    templateUrl: 'company-update.component.html'
})
export class CompanyUpdateComponent implements OnInit {

    companyForm: FormGroup = null;
    company: CompanyTO;

    constructor(private http: HttpGenericService,
                private router: Router,
                private route: ActivatedRoute,
                fb: FormBuilder) {
        this.companyForm = createCompanyForm(fb);
    }

    ngOnInit() {
        this.http.getByUrl<CompanyTO>(resolveUrlParam(this.route, URL_PARAM.BACKEND_URL))
            .subscribe(company => {
                this.company = company;
                fillCompanyForm(this.companyForm, company);
            });
    }

    update() {
        this.http.put(this.company.links.update, this.companyForm.getRawValue() as CreateCompanyTO)
            .subscribe(() => this.router.navigate([RouteConstants.COMPANY_DETAIL, this.company.links.self.href])
            );
    }

    cancel() {
        this.router.navigate([RouteConstants.COMPANY_DETAIL, this.company.links.self.href]);
    }
}
