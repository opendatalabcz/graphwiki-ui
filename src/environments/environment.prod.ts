export const environment = {
    production: true,

    tokenLocalStorage: 'graphwiki-token',
    searchContextLocalStorage: 'graphwiki-search-context',
    openTaskCountLoadInterval: 60 * 1000, // one minute
    searchDebounceTime: 250,

    graphEntryEndpoint: 'http://localhost:9060/graph-service/entry/actions',
    taskEntryEndpoint: 'http://localhost:9090/task-service/entry/actions',
    userEntryEndpoint: 'http://localhost:9050/user-service/entry/actions'
};
