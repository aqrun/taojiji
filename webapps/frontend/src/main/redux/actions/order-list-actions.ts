import { createActionCreator } from 'deox';

export const setTableList = createActionCreator(
    'SET_TABLE_LIST',
    resolve => (table_list) => resolve({table_list})
    );

export const refreshTableList = createActionCreator(
    'REFRESH_TABLE_LIST',
    resolve => (pager, params) => resolve({pager, params})
);

export const setPager = createActionCreator(
    'SET_PAGER',
    resolve => (pager) => resolve({pager})
);

export const setSort = createActionCreator(
    'SET_SORT',
    resolve => sort => resolve({sort})
);

export const setSearchFilter = createActionCreator(
    'SET_SEARCH_FILTER',
    resolve => filter => resolve({filter})
);

export const setTableFilter = createActionCreator(
    'SET_TABLE_FILTER',
    resolve => filter => resolve({filter})
);

export const setTableListLoading = createActionCreator(
    'SET_TABLE_LIST_LOADING',
    resolve => loading => resolve({loading})
);

export const setUserData = createActionCreator(
    'SET_USER_DATA',
    resolve => (username: string, age: number) => resolve({username, age})
);

