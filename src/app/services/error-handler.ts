import {Subject, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {RouteConstants} from '@core/constants/route-constants';
import {AuthService} from './auth.service';

// solve cyclic dependency
export class ErrorHandler {

    static handleError(error: any,
                       router: Router,
                       authService: AuthService,
                       clientErrorSubject: Subject<Error> = null) {
        switch (error.status) {
            case 401:
                authService.logout();
                router.navigateByUrl(RouteConstants.LOGIN);
                break;
            case 403:
                router.navigateByUrl(RouteConstants.UNAUTHORIZED);
                break;
            case 404:
                router.navigateByUrl(RouteConstants.NOT_FOUND);
                break;
            case 422:
                if (clientErrorSubject !== null) {
                    clientErrorSubject.next(error.error);
                } else {
                    router.navigateByUrl(RouteConstants.ERROR);
                }
                break;
            default:
                router.navigateByUrl(RouteConstants.ERROR);
        }
        return throwError(error);
    }
}
