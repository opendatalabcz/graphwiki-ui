import {Component} from '@angular/core';
import {AuthService} from '@src/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthRequest} from '@graphwiki/user-service-api';
import {InputLengthConfig} from '@core/constants/input-length-config';
import {RouteConstants} from '@core/constants/route-constants';
import {Router} from '@angular/router';

export enum LoginFormAttributes {
    USERNAME = 'username',
    PASSWORD = 'password'
}

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent {

    LoginFormAttributes = LoginFormAttributes;
    loginForm: FormGroup;
    invalidCredentialsError: Error;

    constructor(private authService: AuthService,
                private router: Router,
                fb: FormBuilder) {
        this.loginForm = fb.group({
            [LoginFormAttributes.USERNAME]: fb.control(null, [
                Validators.required,
                Validators.email,
                Validators.minLength(InputLengthConfig.LOGIN_USERNAME_MIN_LENGTH),
                Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)
            ]),
            [LoginFormAttributes.PASSWORD]: fb.control(null, [
                Validators.required,
                Validators.minLength(InputLengthConfig.LOGIN_PASSWORD_MIN_LENGTH),
                Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)
            ])
        });
    }

    login() {
        this.authService.login(
            this.loginForm.getRawValue() as AuthRequest,
            (error) => this.invalidCredentialsError = error
        ).subscribe(() => this.router.navigateByUrl(RouteConstants.SEARCH));
    }
}
