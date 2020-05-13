import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputLengthConfig} from '@core/constants/input-length-config';

@Component({
    selector: 'app-comment-input',
    templateUrl: 'comment-input.component.html'
})
export class CommentInputComponent {

    @Input()
    label: string;
    @Input()
    parentForm: FormGroup;
    @Input()
    textFormControlName: string;
    @Input()
    actionLabel: string;

    @Output()
    action = new EventEmitter<void>();
    @Output()
    cancel = new EventEmitter<void>();

    InputLengthConfig = InputLengthConfig;
}
