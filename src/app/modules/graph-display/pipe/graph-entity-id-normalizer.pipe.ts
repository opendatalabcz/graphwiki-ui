import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'graph-entity-id-normalizer'
})
export class GraphEntityIdNormalizerPipe implements PipeTransform {

    transform(value: string): string {
        return value.replace(new RegExp('[0-9]', 'g'), 'X');
    }
}
