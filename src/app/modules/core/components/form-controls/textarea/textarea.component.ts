import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field/typings/form-field';
import {FormUtil} from '@core/util/form-util';

@Component({
    selector: 'app-textarea',
    templateUrl: 'textarea.component.html'
})
export class TextareaComponent {

    @Input()
    inputFormControl: AbstractControl;
    @Input()
    name: string;
    @Input()
    maxLengthHintValue: number;
    @Input()
    placeholder: string;
    @Input()
    inputFormatPlaceholder: string = null;
    @Input()
    appearance: MatFormFieldAppearance = 'outline';

    FormUtil = FormUtil;
}
