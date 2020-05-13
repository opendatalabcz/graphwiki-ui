import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './components/search/search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '@core/core.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatButtonModule, MatIconModule, MatListModule, MatTooltipModule} from '@angular/material';
import {LayoutModule} from '@layout/layout.module';
import {SearchRoutingModule} from './search-routing.module';
import {SearchEntryComponent} from './components/entry/search-entry.component';
import {MomentModule} from 'ngx-moment';

const matModules = [
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule
];

const exports = [
    SearchComponent
];

@NgModule({
    declarations: [
        ...exports,
        SearchEntryComponent
    ],
    exports: [
        ...exports
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        SearchRoutingModule,
        CoreModule,
        LayoutModule,

        ...matModules,

        InfiniteScrollModule,
        MomentModule
    ]
})
export class SearchModule {
}
