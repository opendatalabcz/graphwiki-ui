import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptor} from './interceptor/http.interceptor';
import {CoreModule} from '@core/core.module';
import {EntryEndpointService} from './services/entry-endpoint-service';
import {AuthService} from './services/auth.service';
import {ErrorService} from './services/error.service';
import {HttpGenericService} from './services/http-generic.service';
import {InitService} from './routing/InitService';
import {AppRoutingModule} from './app-routing.module';
import {RoutingService} from '@core/services/routing.service';
import {NgProgress, NgProgressModule} from 'ngx-progressbar';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        AppRoutingModule,
        NgProgressModule.withConfig({
            spinnerPosition: 'left',
            debounceTime: 200,
            trickleSpeed: 200,
            thick: true,
            meteor: false
        })
    ],
    providers: [
        RoutingService,
        AuthService,
        ErrorService,
        HttpGenericService,
        EntryEndpointService,
        InitService,
        NgProgress,
        {
            provide: APP_INITIALIZER,
            useFactory: (initService: InitService, entryEndpointService: EntryEndpointService) =>
                () => initService.load(entryEndpointService),
            deps: [InitService, EntryEndpointService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
