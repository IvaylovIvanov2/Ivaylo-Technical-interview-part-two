import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import axios from 'axios'; 

const initialState = {
    users: []
}

export const store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));

function reducer(state, { type, payload }) {
    switch(type){
        case "LOAD_USERS":
            payload.map(x => x.posts = []);
            return {
                ...state,
                users: state.users.concat(payload)
            };
        case "LOAD_POSTS":
            return {
                ...state,
                users: state.users.map((user) => 
                    user.id === payload[0].userId
                        ? { ...user, posts: payload }
                        : user
                )
            }
        case "SAVE_CHANGES":
            return {
                ...state,
                users: state.users.map((user) => 
                    payload.id === user.id
                        ? { ...user, ...payload }
                        : user
                )
            }
        default:
            return state;
    }
}

export const loadUsersAction = (users) => ({
    type: "LOAD_USERS",
    payload: users
});

export const loadPostsAction = (posts) => ({
    type: "LOAD_POSTS",
    payload: posts
});

export const saveUserChanges = (userUpdate) => ({
    type: "SAVE_CHANGES",
    payload: userUpdate
});

export const fetchUsers = () => {
    return async function(dispatch) {
        const usersResult = await axios.get(
            'https://jsonplaceholder.typicode.com/users'
        );

        dispatch(loadUsersAction(usersResult.data));
    }
};

export const fetchPosts = (user) => {
    return async function (dispatch) {
        const postsResulst = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${user.id}/posts/`
        );
        
        dispatch(loadPostsAction(postsResulst.data));
    }
};