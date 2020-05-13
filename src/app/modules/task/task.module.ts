import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '@core/core.module';
import {ReactiveFormsModule} from '@angular/forms';
import {InboxComponent} from '@task/components/inbox/inbox.component';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule
} from '@angular/material';
import {TaskTypeBadgePipe} from './pipe/task-type-badge.pipe';
import {TaskRoutingModule} from '@task/task-routing.module';
import {TaskTableComponent} from './components/task-table/task-table.component';
import {MomentModule} from 'ngx-moment';
import {LayoutModule} from '@layout/layout.module';

const matModules = [
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MomentModule,
    MatCheckboxModule
];

@NgModule({
    declarations: [
        InboxComponent,
        TaskTypeBadgePipe,
        TaskTableComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        TaskRoutingModule,
        CoreModule,
        LayoutModule,

        ...matModules,
    ]
})
export class TaskModule {
}
