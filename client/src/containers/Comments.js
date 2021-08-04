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
            <div>
                <div className="comment" onClick={handleClicked}>
                    <div className="commentor">
                        <Link to={`/user/${props.comment.user.id}`}>
                            <img src={props.comment.user.profile_img}/>
                            <h4>{props.comment.user.username}</h4>
                        </Link>
                    </div>
                    <Link to={`/posts/${props.post.id}/comments/${props.comment.id}`}>
                        <div className = "comment_text" >
                            <p>{props.comment.content}</p>
                            {clicked ? <div className="btn" onClick={props.delete}><i className="fa fa-trash"></i></div> : null}    
                        </div>
                    </Link>
                    <br/>
                </div>
                <br/>
            </div>
        )
    }else {
        return (
        <div>
            <div className="comment" >
                <div className="commentor">
                    <Link to={`/user/${props.comment.user.id}`}>
                        <img src={props.comment.user.profile_img}/>
                        <h4>{props.comment.user.username}</h4>
                    </Link>
                </div>
                <div className = "comment_text">
                        <p>{props.comment.content}</p>
                </div>
            </div>
            <br/>
        </div>   
        )
    }

}
export default Comments