import {OnInit} from '@angular/core';
import {BaseComponent} from '@core/components/base-component';
import {HttpGenericService} from '@src/services/http-generic.service';
import {ActivatedRoute} from '@angular/router';
import {resolveUrlParam, URL_PARAM} from '@core/util/url-param-resolver';
import {LinkTO} from '@core/entities/linkTO';
import {RouteConstants} from '@core/constants/route-constants';
import {GraphEntity} from '@core/entities/graph-entity.entities';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '@core/components/confirm-dialog/confirm-dialog.component';

export abstract class GraphEntityDetailParent<T extends GraphEntity> extends BaseComponent implements OnInit {

    RouteConstants = RouteConstants;
    entity: T;

    constructor(private httpGenericService: HttpGenericService,
                private route: ActivatedRoute,
                private dialog: MatDialog) {
        super();
    }

    ngOnInit() {
        this.getData();
    }

    private getData() {
        this.subscriptions.push(
            this.httpGenericService.getByUrl<T>(resolveUrlParam(this.route, URL_PARAM.BACKEND_URL))
                .subscribe(entity => this.entity = entity)
        );
    }

    restore(link: LinkTO) {
        this.subscriptions.push(
            this.httpGenericService.putWithoutBody(link).subscribe(() => this.getData())
        );
    }

    delete(link: LinkTO) {
        ConfirmDialogComponent.open(this.dialog, () => {
            this.subscriptions.push(
                this.httpGenericService.delete(link).subscribe(() => this.getData())
            );
        });
    }
}
