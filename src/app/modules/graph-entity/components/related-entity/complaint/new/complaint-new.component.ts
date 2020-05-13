import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ComplaintSetupTO, CreateComplaintTO} from '@graphwiki/graph-service-api';
import {HttpConstants} from '@core/constants/http-constants';
import {RouteConstants} from '@core/constants/route-constants';
import {InputLengthConfig} from '@core/constants/input-length-config';
import {resolveUrlParam, URL_PARAM} from '@core/util/url-param-resolver';
import {HttpGenericService} from '@src/services/http-generic.service';
import {Location} from '@angular/common';

export enum ComplaintFormAttributes {
    TITLE = 'title',
    EXPLANATION = 'explanation'
}

@Component({
    selector: 'app-complaint-new',
    templateUrl: 'complaint-new.component.html'
})
export class ComplaintNewComponent implements OnInit {

    ComplaintFormAttributes = ComplaintFormAttributes;
    complaintForm: FormGroup;
    complaintSetup: ComplaintSetupTO;

    constructor(private httpGenericService: HttpGenericService,
                private router: Router,
                private location: Location,
                private route: ActivatedRoute,
                fb: FormBuilder) {
        this.complaintForm = fb.group({
            title: fb.control(null, [Validators.required, Validators.maxLength(InputLengthConfig.TEXT_DEFAULT_MAX_LENGTH)]),
            explanation: fb.control(null, [Validators.required, Validators.maxLength(InputLengthConfig.TEXT_LONG_DEFAULT_MAX_LENGTH)]),
        });
    }

    ngOnInit() {
        this.httpGenericService.getByUrl<ComplaintSetupTO>(resolveUrlParam(this.route, URL_PARAM.BACKEND_URL))
            .subscribe(complaintSetup => this.complaintSetup = complaintSetup);
    }

    create() {
        const complaint = this.complaintForm.getRawValue() as CreateComplaintTO;
        this.httpGenericService.post<CreateComplaintTO>(this.complaintSetup.links.create, complaint)
            .subscribe(response =>
                this.router.navigate(
                    [RouteConstants.COMPLAINT_DETAIL, response.headers.get(HttpConstants.LOCATION_HEADER)]
                )
            );
    }

    cancel() {
        this.location.back();
    }
}
