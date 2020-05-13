import {Component, OnInit} from '@angular/core';
import {AuthService} from '@src/services/auth.service';
import {AuthInfo} from '@graphwiki/user-service-api';
import {TaskService} from '@task/service/task.service';
import {BaseComponent} from '@core/components/base-component';
import {RouteConstants} from '@core/constants/route-constants';
import {EntryEndpointService} from '@src/services/entry-endpoint-service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {

    authInfo: AuthInfo;
    navbarOpen = false;
    RouteConstants = RouteConstants;
    openTaskCountObservable: Observable<string | null>;

    constructor(private authService: AuthService,
                public entryEndpointService: EntryEndpointService,
                taskService: TaskService) {
        super();
        this.openTaskCountObservable = taskService.getOpenTaskCount()
            .pipe(map(count => count === 0 ? null : count.toString()));
    }

    ngOnInit(): void {
        this.subscriptions.push(this.authService.authInfoObservable().subscribe(authInfo => this.authInfo = authInfo));
    }

    logout() {
        this.authService.logout();
    }

    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }
}
