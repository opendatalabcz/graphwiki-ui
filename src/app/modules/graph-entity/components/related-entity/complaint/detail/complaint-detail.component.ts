import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ComplaintTO} from '@graphwiki/graph-service-api';
import {LinkTO} from '@core/entities/linkTO';
import {resolveUrlParamObservable, URL_PARAM} from '@core/util/url-param-resolver';
import {HttpGenericService} from '@src/services/http-generic.service';

@Component({
    selector: 'app-complaint-detail',
    templateUrl: 'complaint-detail.component.html'
})
export class ComplaintDetailComponent implements OnInit {

    complaint: ComplaintTO;
    private backendUrl: string;

    constructor(private httpGenericService: HttpGenericService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        resolveUrlParamObservable(this.route, URL_PARAM.BACKEND_URL).subscribe(backendUrl => {
            this.backendUrl = backendUrl;
            this.getData();
        });
    }

    makeTransition(link: LinkTO) {
        this.httpGenericService.putWithoutBody(link).subscribe(() => this.getData());
    }

    getData() {
        this.httpGenericService.getByUrl<ComplaintTO>(this.backendUrl).subscribe(complaint => this.complaint = complaint);
    }
}
