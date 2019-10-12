import { createActionCreator } from 'deox';

export const setTableList = createActionCreator(
    'SET_TABLE_LIST',
    resolve => (table_list) => resolve({table_list})
    );

export const setUserData = createActionCreator(
    'SET_USER_DATA',
    resolve => (username: string, age: number) => resolve({username, age})
);

