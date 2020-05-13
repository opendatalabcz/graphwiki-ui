import {ValidatorFn, Validators} from '@angular/forms';

export class HttpValidator {
    private static readonly URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;

    public static urlValidator(): ValidatorFn {
        return Validators.pattern(this.URL_REGEX);
    }
}
