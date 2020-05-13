export class RouteConstants {
    // search
    static readonly SEARCH = '/search';


    // graph
    static readonly GRAPH_DISPLAY = '/graph-display';


    // graph entity
    static readonly GRAPH_ENTITY_DETAIL_GENERIC = '/graph-entity/generic';

    // --> person
    static readonly PERSON_DETAIL = '/graph-entity/person';
    static readonly PERSON_UPDATE = '/graph-entity/person/update';
    static readonly PERSON_NEW = '/graph-entity/person/new';

    // --> company
    static readonly COMPANY_DETAIL = '/graph-entity/company';
    static readonly COMPANY_UPDATE = '/graph-entity/company/update';
    static readonly COMPANY_NEW = '/graph-entity/company/new';

    // --> relationship
    static readonly RELATIONSHIP_DETAIL = '/graph-entity/relationship';
    static readonly RELATIONSHIP_UPDATE = '/graph-entity/relationship/update';
    static readonly RELATIONSHIP_NEW = '/graph-entity/relationship/new';


    // related entity
    static readonly ENTITY_REQUEST_DETAIL = '/graph-entity/request';
    static readonly COMPLAINT_DETAIL = '/graph-entity/complaint';
    static readonly COMPLAINT_NEW = '/graph-entity/complaint/new';


    // task
    static readonly TASK_INBOX = '/task/inbox';


    // user
    static readonly USER_REGISTER = '/user/register';
    static readonly LOGIN = '/user/login';
    static readonly CURRENT_USER = '/user';


    // common
    static readonly ERROR = '/error';
    static readonly NOT_FOUND = '/not-found';
    static readonly UNAUTHORIZED = '/unauthorized';
    static readonly ABOUT = '/about';
}
