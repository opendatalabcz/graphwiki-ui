import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from '@layout/components/layout/default-layout/default-layout.component';
import {SearchEntryComponent} from './components/entry/search-entry.component';

const searchModuleRoutes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {path: '', component: SearchEntryComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(searchModuleRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class SearchRoutingModule {
}
