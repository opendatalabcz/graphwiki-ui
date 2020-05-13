import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'acronym'
})
export class AcronymPipe implements PipeTransform {

    transform(value: string): string {
        return value !== null ? value.split(' ').map(word => word[0]).join('') : null;
    }
}
