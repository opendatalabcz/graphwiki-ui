import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HistoryComponent} from './components/history/history.component';
import {MatIconModule, MatListModule} from '@angular/material';
import {CoreModule} from '@core/core.module';
import {RouterModule} from '@angular/router';
import {HistoryTypeAcronymColorPipe} from './pipe/history-type-acronym-color.pipe';
import {LayoutModule} from '@layout/layout.module';
import {MomentModule} from 'ngx-moment';

const matModules = [
    MatListModule,
    MatIconModule
];

const exports = [
    HistoryComponent
];

@NgModule({
    declarations: [
        ...exports,
        HistoryTypeAcronymColorPipe
    ],
    exports: [
        ...exports
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,

        CoreModule,
        LayoutModule,

        ...matModules,

        MomentModule,
    ]
})
export class HistoryModule {
}
