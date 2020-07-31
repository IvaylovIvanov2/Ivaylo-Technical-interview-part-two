import React from 'react';

export default ({ post }) => {
    return (
        <div className="PostItem">
            <div className="PostTitle">Post Title</div>
            <div className="PostTitleContent">{post.title}</div>
            <div className="PostBody">Post content</div>
            <div className="PostBodyContent">{post.body}</div>
        </div>
    );
};