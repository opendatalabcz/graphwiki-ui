import {Component} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateUserTO} from '@graphwiki/user-service-api';
import {Router} from '@angular/router';
import {RouteConstants} from '@core/constants/route-constants';
import {InputLengthConfig} from '@core/constants/input-length-config';
import {HttpGenericService} from '@src/services/http-generic.service';
import {EntryEndpointService} from '@src/services/entry-endpoint-service';
import {Observable, of} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {ErrorType} from '@core/pipes/validator-message.pipe';

export enum RegisterFormAttributes {
    GIVEN_NAME = 'givenName',
    FAMILY_NAME = 'familyName',
    EMAIL = 'email',
    PASSWORD = 'password',
    CONFIRMED_PASSWORD = 'confirmedPassword'
}

@Component({
    selector: 'app-login',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {

    RegisterFormAttributes = RegisterFormAttributes;
    registerForm: FormGroup;
    InputLengthConfig = InputLengthConfig;

    constructor(private httpGenericService: HttpGenericService,
                private entryEndpointService: EntryEndpointService,
                private router: Router,
                fb: FormBuilder) {
        this.registerForm = fb.group({
            [RegisterFormAttributes.GIVEN_NAME]: fb.control(null, [Validators.required]),
            [RegisterFormAttributes.FAMILY_NAME]: fb.control(null, [Validators.required]),
            [RegisterFormAttributes.EMAIL]: fb.control(null,
                [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(InputLengthConfig.LOGIN_USERNAME_MIN_LENGTH),
                    Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)
                ],
                [this.usernameValidator()]),
            [RegisterFormAttributes.PASSWORD]: fb.control(null,
                [Validators.minLength(InputLengthConfig.LOGIN_PASSWORD_MIN_LENGTH), Validators.required]),
            [RegisterFormAttributes.CONFIRMED_PASSWORD]: fb.control(null,
                [Validators.minLength(InputLengthConfig.LOGIN_PASSWORD_MIN_LENGTH), Validators.required])
        }, {validator: RegisterComponent.checkPasswords});
    }

    private static checkPasswords(group: FormGroup) {
        if (group.get(RegisterFormAttributes.PASSWORD).value === group.get(RegisterFormAttributes.CONFIRMED_PASSWORD).value) {
            return null;
        } else {
            group.get(RegisterFormAttributes.CONFIRMED_PASSWORD).setErrors({passwordsNotMatch: true});
            return {passwordsNotMatch: true};
        }
    }

    usernameValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            if (control.value && Validators.email(control) === null && !control.errors) {
                control.setErrors({asyncValidationIsRunning: true});
                return this.httpGenericService.getWithParams<boolean>(
                    this.entryEndpointService.getCurrentUserApplicationEntryActions().userValidation,
                    new HttpParams().append('username', control.value)
                ).pipe(
                    debounceTime(250),
                    map((valid: boolean) => valid ? null : {[ErrorType.USERNAME_ALREADY_EXISTS]: true})
                );
            } else {
                return of(null);
            }
        };

    }

    register() {
        this.httpGenericService.post<CreateUserTO>(
            this.entryEndpointService.getCurrentUserApplicationEntryActions().register,
            this.registerForm.getRawValue() as CreateUserTO
        ).subscribe(() => this.router.navigate([RouteConstants.LOGIN]));
    }
}
