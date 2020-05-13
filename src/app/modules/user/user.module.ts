import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './components/register/register.component';
import {CoreModule} from '@core/core.module';
import {LayoutModule} from '@layout/layout.module';
import {MatButtonModule} from '@angular/material';
import {UserRoutingModule} from './user-routing.module';
import {LoginComponent} from '@user/components/login/login.component';
import {UserDetailComponent} from '@user/components/detail/user-detail.component';

const matModules = [
    MatButtonModule
];

@NgModule({
    declarations: [
        UserDetailComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        UserRoutingModule,
        CoreModule,
        LayoutModule,

        ...matModules
    ]
})
export class UserModule {
}
