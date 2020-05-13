import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GraphDisplayComponent} from './components/display/graph-display.component';
import {DefaultLayoutComponent} from '@layout/components/layout/default-layout/default-layout.component';

const graphDisplayModuleRoutes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {path: ':url', component: GraphDisplayComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(graphDisplayModuleRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class GraphDisplayRoutingModule {
}
