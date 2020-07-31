import React, { useState } from 'react';
import PostItem from './PostItem';

export default ({ posts }) => {
    const [isOpen, setIsOpen] = useState(true);
    const togglePostSection = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    let postsContent;

    if(isOpen) {
        postsContent = posts.map(post => <PostItem key={post.id} post={post} />)
    } else {
        postsContent = <div className="">Click here to show posts!</div>
    }

    return (
        <div className="PostsSection" onClick={(e) => togglePostSection(e)}>
            {postsContent}
        </div>
    );
};