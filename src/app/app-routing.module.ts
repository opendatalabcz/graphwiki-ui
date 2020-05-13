import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServerErrorComponent} from '@core/components/server-error/server-error.component';
import {DefaultLayoutComponent} from '@layout/components/layout/default-layout/default-layout.component';
import {NotFoundComponent} from '@core/components/not-found/not-found.component';
import {UnauthorizedComponent} from '@core/components/unauthorized/unauthorized.component';
import {AboutComponent} from '@core/components/about/about.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/search', pathMatch: 'full'},
    {path: 'search', loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule)},
    {path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
    {path: 'graph-entity', loadChildren: () => import('./modules/graph-entity/graph-entity.module').then(m => m.GraphEntityModule)},
    {path: 'graph-display', loadChildren: () => import('./modules/graph-display/graph-display.module').then(m => m.GraphDisplayModule)},
    {path: 'task', loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule)},
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {path: 'not-found', component: NotFoundComponent},
            {path: 'error', component: ServerErrorComponent},
            {path: 'unauthorized', component: UnauthorizedComponent},
            {path: 'about', component: AboutComponent},
            {path: '**', component: NotFoundComponent}
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
