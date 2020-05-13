import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InputLengthConfig} from '@core/constants/input-length-config';
import {HttpValidator} from '@core/util/http-validator';
import {CompanyTO} from '@graphwiki/graph-service-api';
import {createAddressForm} from '@graph-entity/components/company/new/address-form/address-form-factory';

export enum CompanyFormAttributes {
    OFFICIAL_NAME = 'officialName',
    REGISTRATION_NUMBER = 'registrationNumber',
    HEADQUARTERS = 'headquarters',
    INDUSTRY = 'industry',
    INCEPTION = 'inception',
    INFORMATION_SOURCE = 'informationSource'
}

export function createCompanyForm(fb: FormBuilder): FormGroup {
    return fb.group({
        [CompanyFormAttributes.OFFICIAL_NAME]: fb.control(null,
            [Validators.required, Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)]),
        [CompanyFormAttributes.REGISTRATION_NUMBER]: fb.control(null,
            [Validators.required, Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)]),
        [CompanyFormAttributes.INDUSTRY]: fb.control(null,
            [Validators.required, Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)]),
        [CompanyFormAttributes.INCEPTION]: fb.control(null),
        [CompanyFormAttributes.INFORMATION_SOURCE]: fb.control(null, [
            Validators.required,
            Validators.maxLength(InputLengthConfig.INFORMATION_SOURCE),
            HttpValidator.urlValidator()
        ]),
        [CompanyFormAttributes.HEADQUARTERS]: createAddressForm(fb)
    });
}

export function fillCompanyForm(form: FormGroup, company: CompanyTO) {
    form.get(CompanyFormAttributes.OFFICIAL_NAME).setValue(company.officialName);
    form.get(CompanyFormAttributes.REGISTRATION_NUMBER).setValue(company.registrationNumber);
    form.get(CompanyFormAttributes.INDUSTRY).setValue(company.industry);
    form.get(CompanyFormAttributes.INCEPTION).setValue(company.inception);
    form.get(CompanyFormAttributes.INFORMATION_SOURCE).setValue(company.informationSource);
    form.get(CompanyFormAttributes.HEADQUARTERS).setValue(company.headquarters);
}
