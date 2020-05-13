import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {ErrorHandler} from './error-handler';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class ErrorService {

    private clientErrorSubject = new Subject<Error>();

    constructor(private router: Router,
                private authService: AuthService) {
    }

    handleError(error: any) {
        return ErrorHandler.handleError(error, this.router, this.authService, this.clientErrorSubject);
    }

    clientError(): Observable<Error> {
        return this.clientErrorSubject.asObservable();
    }
}
