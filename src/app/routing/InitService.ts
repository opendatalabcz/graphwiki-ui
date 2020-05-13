import {Injectable} from '@angular/core';
import {EntryEndpointService} from '@src/services/entry-endpoint-service';

@Injectable()
export class InitService {

    load(entryEndpointService: EntryEndpointService): Promise<any> {
        return Promise.all(entryEndpointService.loadEntryActions(error => {
            throw error;
        })).catch(error => {
            window.alert('Application load failed!');
            throw error;
        }).then();
    }
}
