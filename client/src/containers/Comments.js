import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const Comments = (props) => {

    const [userId, setUserId] = useState("")

    useEffect(() => {
        fetch("/me")
        .then(r => r.json())
        .then(data => {
            setUserId(data.id)
        })
    }, [])

    if(userId === props.comment.user.id || userId === props.post.user.id) {
        return (
            <div className="comments">
                <div className = "comment_text">
                    <h4>{props.comment.user.username}</h4>
                    <p>{props.comment.content}</p>
                    <Link to={`/posts/${props.post.id}/comments/${props.comment.id}`}>
                        <button onClick={props.delete}>delete</button>
                    </Link>
                </div>
                <br/>
            </div>
        )
    }else {
        return (
        <div>
            <div className = "comment_text">
                    <h4>{props.comment.user.username}</h4>
                    <p>{props.comment.content}</p>
            </div>
            <br/>
        </div>   
        )
    }

}
export default Comments