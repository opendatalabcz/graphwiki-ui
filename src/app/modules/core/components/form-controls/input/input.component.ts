import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {FormUtil} from '@core/util/form-util';

declare type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
    selector: 'app-input',
    templateUrl: 'input.component.html'
})
export class InputComponent {

    @Input()
    inputFormControl: AbstractControl;
    @Input()
    type: InputType = 'text';
    @Input()
    name: string;
    @Input()
    placeholder: string;
    @Input()
    minLengthHintValue: number;
    @Input()
    maxLengthHintValue: number;
    @Input()
    showClearButton = false;
    @Input()
    autocomplete: string = null;

    FormUtil = FormUtil;

    clear() {
        this.inputFormControl.setValue(null);
    }
}
