export const environment = {
    production: false,

    tokenLocalStorage: 'graphwiki-token',
    searchContextLocalStorage: 'graphwiki-search-context',
    openTaskCountLoadInterval: 60 * 1000, // one minute
    searchDebounceTime: 250,

    graphEntryEndpoint: 'http://localhost:8060/graph-service/entry/actions',
    taskEntryEndpoint: 'http://localhost:8090/task-service/entry/actions',
    userEntryEndpoint: 'http://localhost:8050/user-service/entry/actions',
};
