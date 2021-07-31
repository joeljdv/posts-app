import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Comments = (props) => {


    return (
        <div className="comments">
            <div className = "comment_text">
                <h4>{props.comment.user.username}</h4>
                <p>{props.comment.content}</p>
                    <button onClick={props.delete}>delete</button>
            </div>
            <br/>
        </div>
    )
}
export default Comments