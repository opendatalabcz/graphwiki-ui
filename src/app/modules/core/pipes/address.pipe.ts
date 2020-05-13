import {Pipe, PipeTransform} from '@angular/core';
import {AddressTO} from '@graphwiki/graph-service-api';

@Pipe({
    name: 'address'
})
export class AddressPipe implements PipeTransform {

    private static nullOrEmpty(value: string | null, suffix = ''): string {
        return !!value ? value + suffix : '';
    }

    transform(address: AddressTO): any {
        return AddressPipe.nullOrEmpty(address.street) + ' '
            + AddressPipe.nullOrEmpty(address.landRegistryNumber, '/') + AddressPipe.nullOrEmpty(address.houseNumber) + ', '
            + AddressPipe.nullOrEmpty(address.postalCode) + ' ' + AddressPipe.nullOrEmpty(address.city) + ', '
            + AddressPipe.nullOrEmpty(address.country);
    }
}
