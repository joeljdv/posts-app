import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
// import EditPost from './EditPost'
import Comments from './Comments'

const Post = (props) => {

    const [post, setPost] = useState({})
    const [user, setUser] = useState("")
    const [error, setError] = useState("")
    const [editFormFlag, setEditFormFlag] = useState(false)
    const [comments, setComments] = useState([])
    const [id, setId] = useState("")
    const [postUserId, setPostUserId] = useState("")

    useEffect(() => {
        fetch(`/posts/${props.match.params.id}`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setPost(data)
            setUser(data.user.username)
            setPostUserId(data.user.id)
        })
    }, [])

    const deletePost = () => {
        fetch(`/posts/${props.match.params.id}`, {
            method: "DELETE"
        })
    }
    
    const editPost = (p) => {
        fetch(`/posts/${props.match.params.id}`, {
            method: 'PATCH',
            body: JSON.stringify(p),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setEditFormFlag(false)
            setPost(data)
        })
    }

    //* Comments

    // get comments

    useEffect(() => {
        fetch(`/posts/${props.match.params.id}`)
        .then(r => r.json())
        .then(data => {
            console.log(data.comments)
            setComments( data.comments)
        })
    }, [])

    // add comments

    const addComment = (c) => {
        fetch(`/posts/${props.match.params.id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(c)
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setComments([...comments, data])
        })
    }

    // delete comments

    const deleteComment = (e) => {
        fetch(`/comments/${e.target.id}`, {
            method: "DELETE"
        })
        console.log(e.target.id)
    }

    const commentsList = comments.map(c => <Comments delete={deleteComment} comment={c} key={c.id}/>)

    // get Id

    useEffect(() => {
        fetch('/me')
        .then(r => r.json())
        .then(data => {
            console.log(data.id)
            setId(data.id)
        })
    }, [])





    if(postUserId === id) {
        return (
            <div>
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <p>by: {user}</p>
                </div>
                <Link to="/posts">
                    <button className="btn" onClick={deletePost}><i className="fa fa-trash"></i></button>
                </Link>  
                <CommentForm addComment={addComment} /> 
                {/* {editFormFlag ? <EditPost post={post} editPost={editPost}/> :
                    <button className="btn" onClick={handleEdit}><i className="fas fa-edit"></i></button>} */}
                <hr/>
                <br/>
                {commentsList}
            </div>
    )
    }else {
        return (
            <div>
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <p>by: {user}</p>
                </div>
                   <CommentForm addComment={addComment} />
                    
                <hr/>
                <br/>
                {commentsList}
            </div> 
        )

    }


}
export default Post
