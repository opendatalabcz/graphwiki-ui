import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LinkTO} from '@core/entities/linkTO';
import {HttpGenericService} from '@src/services/http-generic.service';
import {UserTO} from '@graphwiki/user-service-api';

@Pipe({
    name: 'username'
})
export class UsernamePipe implements PipeTransform {

    constructor(private httpGenericService: HttpGenericService) {
    }

    transform(link: LinkTO): Observable<string> {
        return this.httpGenericService.get<UserTO>(link).pipe(map(user => `${user.givenName} ${user.familyName}`));
    }
}
