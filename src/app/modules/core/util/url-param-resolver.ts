import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export enum URL_PARAM {
    BACKEND_URL = 'url'
}

export const resolveUrlParam: (route: ActivatedRoute, param: URL_PARAM) => string =
    (route: ActivatedRoute, param: URL_PARAM) => route.snapshot.paramMap.get(param);

export const resolveUrlParamObservable: (route: ActivatedRoute, param: URL_PARAM) => Observable<string> =
    (route: ActivatedRoute, param: URL_PARAM) => route.params.pipe(map(paramMap => paramMap[param]));
