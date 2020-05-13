import {Component, Input} from '@angular/core';
import {ErrorService} from '@src/services/error.service';

@Component({
    selector: 'app-error',
    templateUrl: 'error.component.html'
})
export class ErrorComponent {

    @Input()
    errors: Error[] = [];

    constructor(errorService: ErrorService) {
        errorService.clientError().subscribe(error => this.errors.push(error));
    }

    dismiss(error: Error) {
        this.errors = this.errors.filter(e => e !== error);
    }
}
