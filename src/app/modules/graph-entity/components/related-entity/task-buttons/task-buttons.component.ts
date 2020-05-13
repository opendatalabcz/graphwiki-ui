import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {LinkTO} from '@core/entities/linkTO';
import {TaskTO, TaskTOLinks} from '@graphwiki/task-service-api';
import {HttpGenericService} from '@src/services/http-generic.service';

@Component({
    selector: 'app-task-buttons',
    templateUrl: './task-buttons.component.html'
})
export class TaskButtonsComponent implements OnChanges {

    @Input()
    link: LinkTO;
    @Output()
    stateChange = new EventEmitter<void>();

    taskActions: TaskTOLinks;

    constructor(private httpGenericService: HttpGenericService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.link) {
            this.httpGenericService.get<TaskTO>(this.link)
                .subscribe(task => this.taskActions = task.links);
        }
    }

    makeTransition(link: LinkTO) {
        this.httpGenericService.putWithoutBody(link).subscribe(() => {
            this.taskActions = null;
            this.stateChange.emit();
        });
    }
}
