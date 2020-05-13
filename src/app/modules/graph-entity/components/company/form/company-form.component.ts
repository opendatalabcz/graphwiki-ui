import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CompanyFormAttributes} from '@graph-entity/components/company/form/company-form-factory';

@Component({
    selector: 'app-company-form',
    templateUrl: 'company-form.component.html'
})
export class CompanyFormComponent {

    @Input()
    companyForm: FormGroup;

    CompanyFormAttributes = CompanyFormAttributes;
}
