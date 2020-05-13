import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {LabelValueEntity} from '@core/entities/label-value.entities';
import {Country} from '@graphwiki/graph-service-api';
import {AddressFormAttributes} from '@graph-entity/components/company/new/address-form/address-form-factory';

@Component({
    selector: 'app-address-form',
    templateUrl: 'address-form.component.html'
})
export class AddressFormComponent {

    @Input()
    addressForm: FormGroup;
    @Input()
    header: string;

    AddressFormAttributes = AddressFormAttributes;
    countryOptions: LabelValueEntity[] = Object.keys(Country).map(key => {
        return {label: Country[key], value: Country[key]};
    });
}
