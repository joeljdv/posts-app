import React, {useState} from 'react'

const Comments = (props) => {


    return (
        <div className="comments">
            <div className = "comment_text">
                <h4>{props.comment.user.username}</h4>
                <p>{props.comment.content}</p>
            </div>
            <br/>
        </div>
    )
}
export default Comments