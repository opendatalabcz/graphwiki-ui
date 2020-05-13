import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {LinkTO} from '@core/entities/linkTO';
import {UserTO} from '@graphwiki/user-service-api';
import {HttpGenericService} from '@src/services/http-generic.service';

declare type USER_INFO_LAYOUT = 'paragraph' | 'span';

@Component({
    selector: 'app-user-info',
    templateUrl: 'user-info.component.html'
})
export class UserInfoComponent implements OnChanges {

    @Input()
    user: UserTO;
    @Input()
    link: LinkTO;
    @Input()
    label: string;
    @Input()
    placeholder = 'no data';
    @Input()
    styleClasses: string;
    @Input()
    layout: USER_INFO_LAYOUT = 'paragraph';

    constructor(private httpGenericService: HttpGenericService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.link) {
            if (this.link) {
                this.httpGenericService.get<UserTO>(this.link).subscribe(user => this.user = user);
            } else {
                this.user = null;
            }
        }
    }

    getTooltip(): string {
        let tooltip = `${this.user.givenName} ${this.user.familyName}`;
        if (this.user.email) {
            tooltip += ` \n ${this.user.email}`;
        }
        return tooltip;
    }
}
