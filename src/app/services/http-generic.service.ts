import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ErrorService} from './error.service';
import {LinkTO} from '@core/entities/linkTO';

@Injectable()
export class HttpGenericService {

    constructor(private http: HttpClient, private errorService: ErrorService) {
    }

    getResponse<T>(link: LinkTO): Observable<HttpResponse<T>> {
        return this.http.get<T>(link.href, {observe: 'response'}).pipe(catchError(error => this.errorService.handleError(error)));
    }

    get<T>(link: LinkTO): Observable<T> {
        return this.getByUrl<T>(link.href);
    }

    getByUrl<T>(url: string): Observable<T> {
        return this.http.get<T>(url).pipe(catchError(error => this.errorService.handleError(error)));
    }

    getWithParams<T>(link: LinkTO, params: HttpParams): Observable<T> {
        return this.http.get<T>(link.href, {params}).pipe(catchError(error => this.errorService.handleError(error)));
    }

    getBlob(link: LinkTO): Observable<HttpResponse<any>> {
        return this.http.get(link.href, {
            observe: 'response',
            responseType: 'blob'
        }).pipe(catchError(error => this.errorService.handleError(error)));
    }

    putWithoutBody(link: LinkTO): Observable<void> {
        return this.http.put<void>(link.href, null).pipe(catchError(error => this.errorService.handleError(error)));
    }

    put(link: LinkTO, body: any): Observable<void> {
        return this.http.put<void>(link.href, body).pipe(catchError(error => this.errorService.handleError(error)));
    }

    post<T>(link: LinkTO, body: T): Observable<HttpResponse<void>> {
        return this.postByUrl<T>(link.href, body);
    }

    postByUrl<T>(url: string, body: T): Observable<HttpResponse<void>> {
        return this.http.post<void>(url, body, {observe: 'response'}).pipe(catchError(error => this.errorService.handleError(error)));
    }

    postWithReturnValue<T, E>(link: LinkTO, body: T): Observable<E> {
        return this.http.post<E>(link.href, body).pipe(catchError(error => this.errorService.handleError(error)));
    }

    delete(link: LinkTO): Observable<void> {
        return this.http.delete<void>(link.href).pipe(catchError(error => this.errorService.handleError(error)));
    }

    headByUrl(url: string): Observable<HttpResponse<void>> {
        return this.http.head<void>(url, {observe: 'response'}).pipe(catchError(error => this.errorService.handleError(error)));
    }
}

