import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {AuthService} from '@src/services/auth.service';
import {Observable} from 'rxjs';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {finalize} from 'rxjs/operators';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

    private progressRef: NgProgressRef;
    private httpRequestCounter = 0;

    constructor(progress: NgProgress) {
        this.progressRef = progress.ref('loadingProgress');
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.httpRequestCounter === 0) {
            this.progressRef.start();
        }
        this.httpRequestCounter++;

        if (AuthService.getToken()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${AuthService.getToken()}`
                }
            });
        }
        return next.handle(request).pipe(finalize(() => {
            this.httpRequestCounter--;
            if (this.httpRequestCounter === 0) {
                this.progressRef.complete();
            }
        }));
    }
}
