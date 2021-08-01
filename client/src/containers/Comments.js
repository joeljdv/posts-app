import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const Comments = (props) => {

    const [userId, setUserId] = useState("")
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        fetch("/me")
        .then(r => r.json())
        .then(data => {
            setUserId(data.id)
        })
    }, [])

    const handleClicked = () => {
        if(clicked) {
            setClicked(false)
        }else {
            setClicked(true)
        }
    }

    if(userId === props.comment.user.id || userId === props.post.user.id) {
        return (
            <div className="comments" onClick={handleClicked}>
                <Link to={`/posts/${props.post.id}/comments/${props.comment.id}`}>
                <div className = "comment_text" >
                    <h4>{props.comment.user.username}</h4>
                    <p>{props.comment.content}</p>
                    {clicked ? <button onClick={props.delete}>delete</button> : null}    
                </div>
                </Link>
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