import {Component, OnInit} from '@angular/core';
import {HttpGenericService} from '@src/services/http-generic.service';
import {UserTO} from '@graphwiki/user-service-api';
import {EntryEndpointService} from '@src/services/entry-endpoint-service';

@Component({
    selector: 'app-user-detail',
    templateUrl: 'user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

    user: UserTO;

    constructor(private http: HttpGenericService,
                private entryEndpointService: EntryEndpointService) {
    }

    ngOnInit(): void {
        this.http.get<UserTO>(this.entryEndpointService.getCurrentUserApplicationEntryActions().loggedUser)
            .subscribe(user => this.user = user);
    }
}
