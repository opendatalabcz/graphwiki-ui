import {Pipe, PipeTransform} from '@angular/core';
import {Gender} from '@graphwiki/graph-service-api';

@Pipe({
    name: 'genderSalutation'
})
export class GenderSalutationPipe implements PipeTransform {

    transform(gender: Gender): string {
        switch (gender) {
            case Gender.MALE:
                return 'Mr. ';
            case Gender.FEMALE:
                return 'Mrs. ';
            default:
                throw Error(`Invalid gender ${gender}`);
        }
    }
}
