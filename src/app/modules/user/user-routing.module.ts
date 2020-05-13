import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from '@layout/components/layout/default-layout/default-layout.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from '@user/components/login/login.component';
import {UserDetailComponent} from '@user/components/detail/user-detail.component';

const userModuleRoutes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {path: '', component: UserDetailComponent},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userModuleRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule {
}
