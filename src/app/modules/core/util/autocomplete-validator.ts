import {AbstractControl, ValidatorFn} from '@angular/forms';
import {LabelValueEntity} from '@core/entities/label-value.entities';
import {ErrorType} from '@core/pipes/validator-message.pipe';

export class AutocompleteValidator {

    public static validator(options: LabelValueEntity[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            return options.find(option => option.value === control.value) ?
                null :
                {[ErrorType.NOT_AVAILABLE_VALUE]: {value: control.value}};
        };
    }
}
