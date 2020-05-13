import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {BaseComponent} from '@core/components/base-component';
import {RoutingService} from '@core/services/routing.service';
import {AuthService} from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent extends BaseComponent implements OnInit {

    constructor(private authService: AuthService,
                private router: Router,
                private routingService: RoutingService) {
        super();
        this.subscriptions.push(
            this.router.events.subscribe(event => {
                if (event instanceof NavigationStart) {
                    window.scrollTo(0, 0);
                }

                if (event instanceof NavigationError) {
                    console.error(event.error);
                }

                if (event instanceof NavigationEnd) {
                    this.routingService.onChange(event);
                }
            })
        );
    }

    ngOnInit(): void {
        this.authService.initAuthInfo();
    }
}
