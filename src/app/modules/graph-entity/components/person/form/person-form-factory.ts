import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InputLengthConfig} from '@core/constants/input-length-config';
import {AutocompleteValidator} from '@core/util/autocomplete-validator';
import {HttpValidator} from '@core/util/http-validator';
import {Country, PersonTO} from '@graphwiki/graph-service-api';
import {LabelValueEntity} from '@core/entities/label-value.entities';

export enum PersonFormAttributes {
    GIVEN_NAME = 'givenName',
    FAMILY_NAME = 'familyName',
    GENDER = 'gender',
    NATIONALITY = 'nationality',
    DATE_OF_BIRTH = 'dateOfBirth',
    OCCUPATION = 'occupation',
    INFORMATION_SOURCE = 'informationSource'
}

export function createPersonForm(fb: FormBuilder): FormGroup {
    const countryOptions: LabelValueEntity[] = Object.keys(Country).map(key => {
        return {label: Country[key], value: Country[key]};
    });

    return fb.group({
        [PersonFormAttributes.GIVEN_NAME]: fb.control(null,
            [Validators.required, Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)]),
        [PersonFormAttributes.FAMILY_NAME]: fb.control(null,
            [Validators.required, Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)]),
        [PersonFormAttributes.GENDER]: fb.control(null, [Validators.required]),
        [PersonFormAttributes.DATE_OF_BIRTH]: fb.control(null),
        [PersonFormAttributes.NATIONALITY]: fb.control(null,
            [Validators.required, AutocompleteValidator.validator(countryOptions)]),
        [PersonFormAttributes.OCCUPATION]: fb.control(null,
            [Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)]),
        [PersonFormAttributes.INFORMATION_SOURCE]: fb.control(null, [
            Validators.required,
            Validators.maxLength(InputLengthConfig.INFORMATION_SOURCE),
            HttpValidator.urlValidator()
        ])
    });
}

export function fillPersonForm(form: FormGroup, person: PersonTO) {
    form.get(PersonFormAttributes.GIVEN_NAME).setValue(person.givenName);
    form.get(PersonFormAttributes.FAMILY_NAME).setValue(person.familyName);
    form.get(PersonFormAttributes.GENDER).setValue(person.gender);
    form.get(PersonFormAttributes.DATE_OF_BIRTH).setValue(person.dateOfBirth);
    form.get(PersonFormAttributes.NATIONALITY).setValue(person.nationality);
    form.get(PersonFormAttributes.OCCUPATION).setValue(person.occupation);
    form.get(PersonFormAttributes.INFORMATION_SOURCE).setValue(person.informationSource);
}
