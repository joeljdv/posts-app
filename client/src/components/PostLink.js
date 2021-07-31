import React from 'react'
import { Link } from 'react-router-dom'

const PostLink = (props) => {
    return (
        <div>   
            <div className="post">
                <Link className="nav_link" to={`/posts/${props.post.id}/comments`}>
                    <div >  
                        <h4 className="author_name">{props.post.user.username}</h4>
                        <h4 className="post_title">{props.post.title}</h4>
                        <p className="post_content">{props.post.content}</p>      
                    </div>
                </Link>  
                <div>
                    <Link to={`/posts/${props.post.id}/comments`}>
                        <button className="btn"><i className="far fa-comments"> Comemnts</i></button>
                    </Link> 
                </div>
                <br/>
            </div> 
            <br/>
        </div>
    )
}
export default PostLink