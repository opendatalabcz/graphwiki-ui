import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InputLengthConfig} from '@core/constants/input-length-config';
import {AddressTO, Country} from '@graphwiki/graph-service-api';
import {AutocompleteValidator} from '@core/util/autocomplete-validator';
import {LabelValueEntity} from '@core/entities/label-value.entities';

export enum AddressFormAttributes {
    STREET = 'street',
    LAND_REGISTRY_NUMBER = 'landRegistryNumber',
    HOUSE_NUMBER = 'houseNumber',
    POSTAL_CODE = 'postalCode',
    CITY = 'city',
    COUNTRY = 'country'
}

export function createAddressForm(fb: FormBuilder): FormGroup {
    const countryOptions: LabelValueEntity[] = Object.keys(Country).map(key => {
        return {label: Country[key], value: Country[key]};
    });

    return fb.group({
        [AddressFormAttributes.STREET]: fb.control(null,
            [Validators.required, Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)]),
        [AddressFormAttributes.LAND_REGISTRY_NUMBER]: fb.control(null,
            [Validators.required, Validators.min(0), Validators.max(InputLengthConfig.NUMBER_MAX_LENGTH)]),
        [AddressFormAttributes.HOUSE_NUMBER]: fb.control(null,
            [Validators.required, Validators.min(0), Validators.max(InputLengthConfig.NUMBER_MAX_LENGTH)]),
        [AddressFormAttributes.POSTAL_CODE]: fb.control(null,
            [Validators.required, Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)]),
        [AddressFormAttributes.CITY]: fb.control(null,
            [Validators.required, Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)]),
        [AddressFormAttributes.COUNTRY]: fb.control(null,
            [Validators.required, AutocompleteValidator.validator(countryOptions)]),
    });
}

export function fillAddressForm(form: FormGroup, address: AddressTO) {
    form.get(AddressFormAttributes.STREET).setValue(address.street);
    form.get(AddressFormAttributes.LAND_REGISTRY_NUMBER).setValue(address.landRegistryNumber);
    form.get(AddressFormAttributes.HOUSE_NUMBER).setValue(address.houseNumber);
    form.get(AddressFormAttributes.POSTAL_CODE).setValue(address.postalCode);
    form.get(AddressFormAttributes.CITY).setValue(address.city);
    form.get(AddressFormAttributes.COUNTRY).setValue(address.country);
}
