import {TaskTO} from '@graphwiki/task-service-api';
import {UserTO} from '@graphwiki/user-service-api';

export interface MatTableTaskTO {
    taskTO: TaskTO;
    author?: UserTO;
    assignee?: UserTO;
}
