import {Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

export enum ErrorType {
    NOT_AVAILABLE_VALUE = 'notAvailableValue',
    REQUIRED = 'required',
    MAX_LENGTH = 'maxlength',
    MAX = 'max',
    PATTERN = 'pattern',
    EMAIL = 'email',
    INVALID_DATE = 'matDatepickerParse',
    USERNAME_ALREADY_EXISTS = 'usernameAlreadyExists',
    PASSWORDS_NOT_MATCH = 'passwordsNotMatch'
}

@Pipe({
    name: 'validatorMessage'
})
export class ValidatorMessagePipe implements PipeTransform {

    private static getValidatorMessage(error: string): string {
        switch (error) {
            case ErrorType.REQUIRED:
                return 'Value is required';
            case ErrorType.MAX_LENGTH:
                return 'Value is too long';
            case ErrorType.MAX:
                return 'Value is too big';
            case ErrorType.PATTERN:
                return 'Value does not match expected pattern';
            case ErrorType.EMAIL:
                return 'Value is not a valid email';
            case ErrorType.NOT_AVAILABLE_VALUE:
                return 'Value is not available';
            case ErrorType.INVALID_DATE:
                return 'Invalid date';
            case ErrorType.USERNAME_ALREADY_EXISTS:
                return 'Username already exists';
            case ErrorType.PASSWORDS_NOT_MATCH:
                return 'Passwords do not match';
            default:
                return `Field is invalid - ${error}`;
        }
    }

    transform(errors: ValidationErrors | null): string {
        if (!!errors) {
            if (Object.keys(errors).includes(ErrorType.REQUIRED)) {
                return ValidatorMessagePipe.getValidatorMessage(ErrorType.REQUIRED);
            } else {
                return Object.keys(errors)
                    .map(error => ValidatorMessagePipe.getValidatorMessage(error))
                    .join('\n');
            }
        } else {
            return null;
        }
    }
}
