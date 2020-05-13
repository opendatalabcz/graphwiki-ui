import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, filter, tap} from 'rxjs/operators';
import {SearchCompanyRecord, SearchPersonRecord, SearchResult} from '@graphwiki/graph-service-api';
import {environment} from '@environment/environment';
import {HttpGenericService} from '@src/services/http-generic.service';
import {InputLengthConfig} from '@core/constants/input-length-config';
import {InitService} from '@src/routing/InitService';
import {HttpParams} from '@angular/common/http';
import {RouteConstants} from '@core/constants/route-constants';
import {EntryEndpointService} from '@src/services/entry-endpoint-service';

enum SearchFormAttributes {
    SEARCH_QUERY = 'searchQuery'
}

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit {

    @Input() selectedVertexFormControl: FormControl;
    @Input() useLocalStorageQuery = false;
    @Input() searchInputPlaceholder: string;
    @Input() searchInputCentered = false;
    @Input() showSelected = false;
    @Input() showDetailButton = false;

    RouteConstants = RouteConstants;
    InputLengthConfig = InputLengthConfig;
    SearchFormAttributes = SearchFormAttributes;
    searchForm: FormGroup;
    searchResult: SearchResult;
    entitySelected = false;
    personData: SearchPersonRecord[];
    companyData: SearchCompanyRecord[];

    constructor(private httpGenericService: HttpGenericService,
                private initService: InitService,
                private entryEndpointService: EntryEndpointService,
                private fb: FormBuilder) {
        this.searchForm = fb.group({
            [SearchFormAttributes.SEARCH_QUERY]: fb.control(null,
                [
                    Validators.required,
                    Validators.minLength(InputLengthConfig.GRAPH_SEARCH_MIN_LENGTH),
                    Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)
                ])
        });
    }

    ngOnInit() {
        this.searchForm.get(SearchFormAttributes.SEARCH_QUERY).valueChanges
            .pipe(
                debounceTime(environment.searchDebounceTime),
                filter(() => this.searchForm.valid),
                tap(query => {
                    if (this.useLocalStorageQuery) {
                        localStorage.setItem(environment.searchContextLocalStorage, query);
                    }
                })
            )
            .subscribe(query => {
                    this.httpGenericService.getWithParams<SearchResult>(
                        this.entryEndpointService.getCurrentGraphApplicationEntryActions().search,
                        new HttpParams().append('query', query).append('page', '1')
                    ).subscribe(searchResult => {
                        this.searchResult = searchResult;
                        this.personData = searchResult.persons;
                        this.companyData = searchResult.companies;
                    });
                }
            );

        if (this.useLocalStorageQuery) {
            this.searchForm.get(SearchFormAttributes.SEARCH_QUERY).setValue(localStorage.getItem(environment.searchContextLocalStorage));
        }
    }

    searchNextPage() {
        if (this.searchResult && this.searchResult.links.nextPage) {
            this.httpGenericService.get<SearchResult>(this.searchResult.links.nextPage)
                .subscribe(searchResult => this.searchResult = searchResult);
        }
    }

    _selectPerson(person: SearchPersonRecord) {
        if (this.showSelected) {
            this.entitySelected = true;
            this.personData = [person];
            this.companyData = null;
        }
        this.selectedVertexFormControl.setValue(person);
    }

    _selectCompany(company: SearchCompanyRecord) {
        if (this.showSelected) {
            this.entitySelected = true;
            this.personData = null;
            this.companyData = [company];
        }
        this.selectedVertexFormControl.setValue(company);
    }

    unselect() {
        if (this.showSelected) {
            this.entitySelected = false;
            this.personData = this.searchResult.persons;
            this.companyData = this.searchResult.companies;
            this.selectedVertexFormControl.setValue(null);
        }
    }

    reset() {
        this.unselect();
        this.searchResult = null;
        this.personData = null;
        this.companyData = null;
        this.searchForm.reset();
    }
}
