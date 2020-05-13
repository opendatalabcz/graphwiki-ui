import {Injectable} from '@angular/core';
import {filter, mergeMap, startWith} from 'rxjs/operators';
import {interval, Observable, ReplaySubject, Subscription} from 'rxjs';
import {HttpGenericService} from '@src/services/http-generic.service';
import {environment} from '@environment/environment';
import {InitService} from '@src/routing/InitService';
import {EntryEndpointService} from '@src/services/entry-endpoint-service';
import {LinkTO} from '@core/entities/linkTO';

@Injectable()
export class TaskService {

    private openTaskCountSubscription: Subscription;
    private openTaskCountSubject = new ReplaySubject<number>();

    constructor(private httpGenericService: HttpGenericService,
                private initService: InitService,
                entryEndpointService: EntryEndpointService) {
        entryEndpointService.getTaskApplicationEntryActions()
            .pipe(filter(actions => !!actions))
            .subscribe(actions => {
                if (actions.openTaskCount) {
                    this.startOpenTasksCountPolling(actions.openTaskCount);
                } else {
                    if (this.openTaskCountSubscription) {
                        this.openTaskCountSubscription.unsubscribe();
                        this.openTaskCountSubscription = null;
                    }
                }
            });
    }

    getOpenTaskCount(): Observable<number> {
        return this.openTaskCountSubject.asObservable();
    }

    private startOpenTasksCountPolling(link: LinkTO) {
        if (!this.openTaskCountSubscription) {
            this.openTaskCountSubscription = interval(environment.openTaskCountLoadInterval)
                .pipe(
                    startWith(0),
                    mergeMap(() => this.httpGenericService.get<number>(link)),
                ).subscribe(count => this.openTaskCountSubject.next(count));
        }
    }
}
