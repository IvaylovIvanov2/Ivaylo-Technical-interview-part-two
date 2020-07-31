import React, { useState } from 'react';
import UserInput from "./UserInput";
import { useDispatch } from 'react-redux';
import { saveUserChanges, fetchPosts, store } from '../redux'; 
import PostsSection from './PostsSection';

export default React.memo(({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    let userUpdateObject = {...user, address: { ...user.address }, company: { ...user.company } };
    let userContent;

    const updateUserInfo = (target) => {
        if(target.id.indexOf('.') === -1){
            userUpdateObject[target.id] = target.value;
        } else {
            var keys = target.id.split('.');
            userUpdateObject[keys[0]][keys[1]] = target.value;
        }
    };

    const saveChanges = (e) => {
        e.stopPropagation();
        dispatch(saveUserChanges(userUpdateObject));
    };

    const loadUserPosts = (e) => {
        e.stopPropagation();
        store.dispatch(fetchPosts(user));
    };
    
    if(isOpen){
        let userInputs = 
            <div className="UserInputs"> 
                {   
                    Object.keys(userUpdateObject).filter(key => key !== 'posts').map(key => {
                        return <UserInput key={key} inputItem={userUpdateObject[key]} inputItemKey={key} onChange={(e) => updateUserInfo(e) } />
                    })
                }
            </div>

        userContent = 
            <div>
                {userInputs}
                <button onClick={(e) => saveChanges(e)}>Save changes</button>
                <button onClick={(e) => loadUserPosts(e)}>Get user's posts</button>
                {
                    user.posts.length > 0 &&
                        <PostsSection posts={user.posts} />
                }
            </div>
    }
    else {
        userContent = <div>{user.name}</div>
    }

    return (
        <div className="UserPanel" onClick={() => setIsOpen(!isOpen)}>
            <img src={`../pictures/profile-pic-${user.id}.jpg`} />
            {userContent}
        </div>
    );
});