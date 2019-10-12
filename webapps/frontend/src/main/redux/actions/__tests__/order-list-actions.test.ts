import * as actions from '../order-list-actions';

describe('actions', ()=>{
    it('should create an action to add table_list', () => {
        const table_list:[] = [];
        const expectedAction = {
            type: actions.setTableList.type,
            payload: {table_list},
        };
        expect(actions.setTableList(table_list)).toEqual(expectedAction);
    });

    it('should set user data', () => {
        const expectedAction = {
            type: actions.setUserData.type,
            payload: {username: 'alex', age: 18}
        };
        expect(actions.setUserData('alex', 18)).toEqual(expectedAction)
    });
});