import {Injectable} from '@angular/core';
import {environment} from '@environment/environment';
import {ApplicationEntryActions as TaskApplicationEntryActions} from '@graphwiki/task-service-api';
import {ApplicationEntryActions as GraphApplicationEntryActions} from '@graphwiki/graph-service-api';
import {ApplicationEntryActions as UserApplicationEntryActions} from '@graphwiki/user-service-api';
import {BehaviorSubject, Observable, ObservableInput} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable()
export class EntryEndpointService {

    private userEntryActions = new BehaviorSubject<UserApplicationEntryActions>(null);
    private taskEntryActions = new BehaviorSubject<TaskApplicationEntryActions>(null);
    private graphEntryActions = new BehaviorSubject<GraphApplicationEntryActions>(null);

    constructor(private http: HttpClient) {
    }

    loadEntryActions(errorHandler: (error: Error) => ObservableInput<any>): Promise<any>[] {
        return [
            this.http.get<UserApplicationEntryActions>(environment.userEntryEndpoint)
                .pipe(catchError(err => errorHandler(err)))
                .toPromise()
                .then(actions => this.userEntryActions.next(actions)),
            this.http.get<TaskApplicationEntryActions>(environment.taskEntryEndpoint)
                .pipe(catchError(err => errorHandler(err)))
                .toPromise()
                .then(actions => this.taskEntryActions.next(actions)),
            this.http.get<GraphApplicationEntryActions>(environment.graphEntryEndpoint)
                .pipe(catchError(err => errorHandler(err)))
                .toPromise()
                .then(actions => this.graphEntryActions.next(actions))
        ];
    }

    getCurrentUserApplicationEntryActions(): UserApplicationEntryActions {
        return this.userEntryActions.getValue();
    }

    getTaskApplicationEntryActions(): Observable<TaskApplicationEntryActions> {
        return this.taskEntryActions.asObservable();
    }

    getGraphApplicationEntryActions(): Observable<GraphApplicationEntryActions> {
        return this.graphEntryActions.asObservable();
    }

    getCurrentGraphApplicationEntryActions(): GraphApplicationEntryActions {
        return this.graphEntryActions.getValue();
    }
}
