import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InboxComponent} from '@task/components/inbox/inbox.component';
import {DefaultLayoutComponent} from '@layout/components/layout/default-layout/default-layout.component';

const taskModuleRoutes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {path: 'inbox', component: InboxComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(taskModuleRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class TaskRoutingModule {
}
