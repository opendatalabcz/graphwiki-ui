import {Injectable} from '@angular/core';
import {LinkTO} from '@core/entities/linkTO';
import {saveAs} from 'file-saver';
import {HttpConstants} from '@core/constants/http-constants';
import {HttpGenericService} from '@src/services/http-generic.service';

@Injectable()
export class ExportService {

    constructor(private http: HttpGenericService) {
    }

    export(link: LinkTO) {
        this.http.getBlob(link)
            .subscribe(response => {
                const filename = response.headers.get(HttpConstants.CONTENT_DISPOSITION_HEADER)
                    .split(';')[1]
                    .split('filename')[1]
                    .split('=')[1]
                    .trim()
                    .slice(1, -1);
                saveAs(response.body, filename);
            });
    }
}
