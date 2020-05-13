import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {FormUtil} from '@core/util/form-util';

@Component({
    selector: 'app-date-picker',
    templateUrl: 'date-picker.component.html'
})
export class DatePickerComponent {

    @Input()
    dateInputFormControl: AbstractControl;
    @Input()
    name: string;
    @Input()
    placeholder: string;
    @Input()
    max: Date = null;

    inputFormatPlaceholder = 'mm/dd/yyyy';
    FormUtil = FormUtil;
}
