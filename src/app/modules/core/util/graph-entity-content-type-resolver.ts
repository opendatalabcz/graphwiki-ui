import {HttpResponse} from '@angular/common/http';
import {HttpConstants} from '@core/constants/http-constants';
import {GraphEntity} from '@core/entities/graph-entity.entities';
import {CompanyTO, PersonTO, RelationshipTO} from '@graphwiki/graph-service-api';

export function resolveGraphEntityByContentTypeFromGetRequest(response: HttpResponse<GraphEntity>,
                                                              onPerson: (person: PersonTO) => void,
                                                              onCompany: (company: CompanyTO) => void,
                                                              onRelationship: (relationship: RelationshipTO) => void) {
    const contentType = response.headers.get(HttpConstants.CONTENT_TYPE_HEADER);
    switch (contentType) {
        case 'application/vnd.cz.gregetom.graphwiki.person+json':
            return onPerson(response.body as PersonTO);
        case 'application/vnd.cz.gregetom.graphwiki.company+json':
            return onCompany(response.body as CompanyTO);
        case 'application/vnd.cz.gregetom.graphwiki.relationship+json':
            return onRelationship(response.body as RelationshipTO);
        default:
            throw Error(`Invalid content type ${contentType}!`);
    }
}

export function resolveGraphEntityByContentTypeFromHeadRequest(response: HttpResponse<void>,
                                                               onPerson: () => void,
                                                               onCompany: () => void,
                                                               onRelationship: () => void) {
    const contentType = response.headers.get(HttpConstants.CONTENT_TYPE_HEADER);
    switch (contentType) {
        case 'application/vnd.cz.gregetom.graphwiki.person+json':
            return onPerson();
        case 'application/vnd.cz.gregetom.graphwiki.company+json':
            return onCompany();
        case 'application/vnd.cz.gregetom.graphwiki.relationship+json':
            return onRelationship();
        default:
            throw Error(`Invalid content type ${contentType}!`);
    }
}
