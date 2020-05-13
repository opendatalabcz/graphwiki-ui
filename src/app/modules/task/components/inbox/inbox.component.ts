import {Component} from '@angular/core';
import {HttpGenericService} from '@src/services/http-generic.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {LinkTO} from '@core/entities/linkTO';
import {EntryEndpointService} from '@src/services/entry-endpoint-service';

enum TABS {
    TEAM = 'Team',
    PRIVATE = 'Private'
}

@Component({
    selector: 'app-inbox',
    templateUrl: 'inbox.component.html'
})
export class InboxComponent {

    teamInboxLink: LinkTO;
    teamInboxWithAssignedLink: LinkTO;
    privateInboxLink: LinkTO;

    TABS = TABS;
    activeTab: TABS;
    searchFormControl: FormControl;
    showAssignedFormControl: FormControl;
    showAssignedTasks = false;

    constructor(private httpGenericService: HttpGenericService,
                entryEndpointService: EntryEndpointService,
                fb: FormBuilder) {
        entryEndpointService.getTaskApplicationEntryActions().subscribe(actions => {
            this.teamInboxLink = actions.taskInboxTeam;
            this.teamInboxWithAssignedLink = actions.taskInboxTeamWithAssigned;
            if (this.teamInboxLink || this.teamInboxWithAssignedLink) {
                this.activeTab = TABS.TEAM;
            } else {
                this.activeTab = TABS.PRIVATE;
            }
            this.privateInboxLink = actions.taskInboxPrivate;
        });

        this.searchFormControl = fb.control(null);
        this.showAssignedFormControl = fb.control(false);

        this.showAssignedFormControl.valueChanges.subscribe(showAssigned => {
            this.showAssignedTasks = showAssigned;
        });
    }
}
