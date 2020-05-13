import {Component, Input} from '@angular/core';
import {LabelValueEntity} from '@core/entities/label-value.entities';
import {AbstractControl} from '@angular/forms';
import {FormUtil} from '@core/util/form-util';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html'
})
export class SelectComponent {

    @Input()
    selectFormControl: AbstractControl;
    @Input()
    options: LabelValueEntity[];
    @Input()
    placeholder: string;

    FormUtil = FormUtil;
}
