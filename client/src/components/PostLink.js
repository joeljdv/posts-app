import React from 'react'
import { Link } from 'react-router-dom'

const PostLink = (props) => {
    return (
        <div>   
            <div className="post">
                <div className="user_inf">
                    <Link to={`/user/${props.user.id}`}>
                        <img src={props.user.profile_img}/>
                        <h4 className="author_name">{props.user.username}</h4>
                    </Link>
                </div>
                <Link className="nav_link" to={`/posts/${props.post.id}/comments`}>
                    <div >  
                        <h4 className="post_title">{props.post.title}</h4>
                        <p className="post_content">{props.post.content}</p>      
                    </div>
                </Link>  
                <div>
                    <Link to={`/posts/${props.post.id}/comments`}>
                        <div className="btn"><i className="far fa-comments"></i></div>
                    </Link> 
                </div>
                <br/>
            </div> 
            <br/>
        </div>
    )
}
export default PostLink