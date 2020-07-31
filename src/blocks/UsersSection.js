import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, store } from '../redux';
import ReactLoading from 'react-loading';
import UserItem from "./UserItem";

export default () => {
    const [isLoading, setIsLoading] = useState(true);
    const users = useSelector((state) => state.users);
    useEffect(() => {
        store.dispatch(fetchUsers());
        //Fake wait for api call
        const timeout = setTimeout(() => {
            setIsLoading(false);
          }, 2000);
          return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="UsersPanel">
            {isLoading ? 
            <div className="LoadingContent">
                <ReactLoading type={"balls"} color={"black"} />
            </div>
            :
            users.map(user => (
                <UserItem 
                    key={user.id} 
                    user={user} 
                />
            ))}
        </div>
    );
};