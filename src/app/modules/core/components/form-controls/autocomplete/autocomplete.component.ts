import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LabelValueEntity} from '@core/entities/label-value.entities';
import {FormUtil} from '@core/util/form-util';

@Component({
    selector: 'app-autocomplete',
    templateUrl: 'autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit {

    @Input()
    placeholder: string;
    @Input()
    autocompleteFormControl: AbstractControl;
    @Input()
    name: string;
    @Input()
    options: LabelValueEntity[];

    filteredOptions: Observable<LabelValueEntity[]>;
    FormUtil = FormUtil;

    ngOnInit() {
        this.filteredOptions = this.autocompleteFormControl.valueChanges
            .pipe(
                startWith(''),
                map(filterValue => this.filterCountries(filterValue))
            );
    }

    private filterCountries(filterValue: string): LabelValueEntity[] {
        return filterValue ? this.options.filter(option => option.label.toLowerCase().includes(filterValue.toLowerCase())) : this.options;
    }
}
