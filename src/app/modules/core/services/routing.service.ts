import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {NavigationEnd} from '@angular/router';
import {Location} from '@angular/common';

@Injectable()
export class RoutingService {
    private history = [];
    private locationBackwardUrlSubject = new ReplaySubject<string | null>();
    private locationForwardIsRunning = false;
    private locationBackwardIsRunning = false;
    private locationForwardAvailableSubject = new ReplaySubject<boolean>();
    private locationForwardCounter = 0;

    constructor(private location: Location) {
        this.locationForwardAvailableSubject.next(false);
    }

    onChange(event: NavigationEnd) {
        if (!this.locationForwardIsRunning && !this.locationBackwardIsRunning) {
            this.resetLocationForwardCounter();
        }
        this.locationForwardIsRunning = false;

        if (this.locationBackwardIsRunning) {
            this.locationBackwardIsRunning = false;
        } else {
            this.history = [...this.history, event.urlAfterRedirects];
        }
        this.locationBackwardUrlSubject.next(this.getPreviousUrl());
    }

    locationBackwardUrl(resetLocationForwardCounter: boolean): Observable<string | null> {
        if (resetLocationForwardCounter) {
            this.resetLocationForwardCounter();
        }
        return this.locationBackwardUrlSubject.asObservable();
    }

    locationForwardAvailable(): Observable<boolean> {
        return this.locationForwardAvailableSubject.asObservable();
    }

    locationBackward() {
        this.locationForwardAvailableSubject.next(++this.locationForwardCounter !== 0);
        this.locationBackwardIsRunning = true;
        this.history.pop();
        this.location.back();
    }

    locationForward() {
        this.locationForwardAvailableSubject.next(--this.locationForwardCounter !== 0);
        this.locationForwardIsRunning = true;
        this.location.forward();
    }

    private resetLocationForwardCounter() {
        this.locationForwardAvailableSubject.next(false);
        this.locationForwardCounter = 0;
    }

    private getPreviousUrl(): string {
        return this.history[this.history.length - 2] || null;
    }
}
