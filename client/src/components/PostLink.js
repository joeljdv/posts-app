import React from 'react'
import { Link } from 'react-router-dom'

const PostLink = ({post}) => {
    return (
        <div className="posts">
            <Link to={`/posts/${post.id}`}>
                {post.title}
            </Link> 
        </div>
    )
}
export default PostLink