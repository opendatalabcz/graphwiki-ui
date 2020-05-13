import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HttpGenericService} from '@src/services/http-generic.service';
import {TaskTO, TaskType} from '@graphwiki/task-service-api';
import {FormControl} from '@angular/forms';
import {LinkTO} from '@core/entities/linkTO';
import {RouteConstants} from '@core/constants/route-constants';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatTableTaskTO} from '@task/components/task-table/task-table.entities';
import {UserTO} from '@graphwiki/user-service-api';
import {MomentUtil} from '@core/util/moment-util';

enum TABLE_COLUMNS {
    ICONS = 'icons',
    OVERVIEW = 'overview',
    AUTHOR = 'author',
    ASSIGNEE = 'assignee',
    CREATED = 'created',
    STATE = 'state',
    ASSIGN_LINK = 'assignLink'
}

@Component({
    selector: 'app-task-table',
    templateUrl: 'task-table.component.html',
    styleUrls: ['task-table.component.scss']
})
export class TaskTableComponent implements OnInit, OnChanges {

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @Input()
    link: LinkTO;
    @Input()
    searchFormControl: FormControl;

    TABLE_COLUMNS = TABLE_COLUMNS;
    pageSizeOptions = [5, 10, 25, 50, 100];
    displayedColumns = [
        TABLE_COLUMNS.ICONS,
        TABLE_COLUMNS.OVERVIEW,
        TABLE_COLUMNS.AUTHOR,
        TABLE_COLUMNS.ASSIGNEE,
        TABLE_COLUMNS.CREATED,
        TABLE_COLUMNS.STATE,
        TABLE_COLUMNS.ASSIGN_LINK
    ];
    dataSource: MatTableDataSource<MatTableTaskTO>;
    MomentUtil = MomentUtil;

    constructor(private httpGenericService: HttpGenericService,
                private router: Router) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = matTableSortPredicate;
        this.dataSource.filterPredicate = matTableFilterPredicate;

        this.searchFormControl.valueChanges
            .pipe(map(value => value ? (value as string).trim().toLowerCase() : value))
            .subscribe(query => this.dataSource.filter = query);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.link) {
            this.getData();
        }
    }

    private getData() {
        this.httpGenericService.get<TaskTO[]>(this.link)
            .subscribe(tasks => {
                this.dataSource.data = tasks.map(value => {
                    const matTableTaskTO: MatTableTaskTO = {taskTO: {...value}};
                    return matTableTaskTO;
                });
                this.loadAuthorAndAssignee();
            });
    }

    loadAuthorAndAssignee() {
        this.dataSource.data.forEach(matTableTask => {
            this.httpGenericService.getByUrl<UserTO>(matTableTask.taskTO.author.href)
                .subscribe(author => matTableTask.author = author);
            if (matTableTask.taskTO.assignee) {
                this.httpGenericService.getByUrl<UserTO>(matTableTask.taskTO.assignee.href)
                    .subscribe(assignee => matTableTask.assignee = assignee);
            }
        });
    }

    assign(task: TaskTO) {
        this.httpGenericService.putWithoutBody(task.links.assign)
            .subscribe(() => this.router.navigate([this.getRouteConstant(task.type), task.links.entity.href]));
    }

    getRouteConstant(type: TaskType): string {
        switch (type) {
            case TaskType.COMPLAINT:
                return RouteConstants.COMPLAINT_DETAIL;
            case TaskType.ENTITYREQUEST:
                return RouteConstants.ENTITY_REQUEST_DETAIL;
            default:
                throw Error(`Invalid task type ${type}`);
        }
    }

    castToMatTableTaskTO(row: any): MatTableTaskTO {
        return row as MatTableTaskTO;
    }
}


function matTableFilterPredicate(matTableTask: MatTableTaskTO, filter: string) {
    const values = Object.keys(matTableTask.taskTO).map(key => matTableTask.taskTO[key]);
    if (matTableTask.author) {
        values.push(Object.keys(matTableTask.author).map(key => matTableTask.author[key]));
    }
    if (matTableTask.assignee) {
        values.push(Object.keys(matTableTask.assignee).map(key => matTableTask.assignee[key]));
    }
    return !!values
        .filter(value => !!value)
        .map(value => value.toString())
        .find(value => {
            return value.toLowerCase().includes(filter.toLowerCase());
        });
}

function matTableSortPredicate(matTableTask: MatTableTaskTO, sortHeaderId: TABLE_COLUMNS): string {
    switch (sortHeaderId) {
        case TABLE_COLUMNS.OVERVIEW:
            return matTableTask.taskTO.label.toLowerCase();
        case TABLE_COLUMNS.AUTHOR:
            if (matTableTask.author) {
                return `${matTableTask.author.givenName} ${matTableTask.author.familyName}`.toLowerCase();
            } else {
                return null;
            }
        case TABLE_COLUMNS.ASSIGNEE:
            if (matTableTask.assignee) {
                return `${matTableTask.assignee.givenName} ${matTableTask.assignee.familyName}`.toLowerCase();
            } else {
                return null;
            }
        case TABLE_COLUMNS.CREATED:
            return matTableTask.taskTO.created.toLocaleString();
        case TABLE_COLUMNS.STATE:
            return matTableTask.taskTO.state;
    }
}
