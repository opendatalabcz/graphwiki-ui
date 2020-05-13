import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {environment} from '@environment/environment';
import {AuthInfo, AuthRequest, AuthResponse} from '@graphwiki/user-service-api';
import {EntryEndpointService} from './entry-endpoint-service';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ErrorHandler} from './error-handler';

@Injectable()
export class AuthService {
    private authInfo = new BehaviorSubject<AuthInfo>(null);

    constructor(private http: HttpClient,
                private router: Router,
                private entryEndpointService: EntryEndpointService) {
        this.authInfoObservable().subscribe(() =>
            this.entryEndpointService.loadEntryActions(error => ErrorHandler.handleError(error, this.router, this)));
    }

    static getToken(): string {
        return localStorage.getItem(environment.tokenLocalStorage);
    }

    login(authRequest: AuthRequest, onInvalidCredentials: (error: any) => void): Observable<void> {
        return this.http.post<AuthResponse>(
            this.entryEndpointService.getCurrentUserApplicationEntryActions().authenticate.href, authRequest
        ).pipe(
            catchError(error => {
                if (error.status === 401 || error.status === 403) {
                    error.message = 'Invalid username or password!';
                    onInvalidCredentials(error);
                    return throwError(error);
                } else {
                    return ErrorHandler.handleError(error, this.router, this);
                }
            }),
            tap(authResponse => localStorage.setItem(environment.tokenLocalStorage, authResponse.token)),
            tap(authResponse => this.authInfo.next(authResponse.authInfo)),
            map(() => null)
        );
    }

    logout() {
        localStorage.removeItem(environment.tokenLocalStorage);
        this.authInfo.next(null);
    }

    initAuthInfo(): void {
        this.http.get<AuthInfo>(this.entryEndpointService.getCurrentUserApplicationEntryActions().authInfo.href)
            .pipe(catchError(error => ErrorHandler.handleError(error, this.router, this)))
            .subscribe(authInfo => this.authInfo.next(authInfo));
    }

    authInfoObservable(): Observable<AuthInfo> {
        return this.authInfo.asObservable();
    }
}
