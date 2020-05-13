import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PersonFormAttributes} from '@graph-entity/components/person/form/person-form-factory';
import {LabelValueEntity} from '@core/entities/label-value.entities';
import {Country, Gender} from '@graphwiki/graph-service-api';
import {GenderSalutationPipe} from '@core/pipes/gender-salutation.pipe';

@Component({
    selector: 'app-person-form',
    templateUrl: 'person-form.component.html'
})
export class PersonFormComponent {

    @Input()
    personForm: FormGroup;

    PersonFormAttributes = PersonFormAttributes;
    nowDate = new Date();
    genders: LabelValueEntity[];
    countryOptions: LabelValueEntity[] = Object.keys(Country).map(key => {
        return {label: Country[key], value: Country[key]};
    });

    constructor(private genderSalutationPipe: GenderSalutationPipe) {
        this.genders = [
            {label: this.genderSalutationPipe.transform(Gender.MALE), value: Gender.MALE},
            {label: this.genderSalutationPipe.transform(Gender.FEMALE), value: Gender.FEMALE}
        ];
    }
}
