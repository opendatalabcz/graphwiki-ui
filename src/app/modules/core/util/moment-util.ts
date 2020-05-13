import * as moment from 'moment';

export class MomentUtil {

    static fromDateString(dateString: string): moment.Moment {
        return moment(dateString);
    }
}
