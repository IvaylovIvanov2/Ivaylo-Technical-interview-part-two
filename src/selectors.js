import { createSelector } from 'reselect';
const getUsers = (state) => state.users;

export const userSelector = createSelector(
    getUsers, 
    (users, userId) => { return users.find(x => x.id == userId) }
);