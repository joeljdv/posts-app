import React, {useState, useEffect} from 'react'
import { Link} from 'react-router-dom'
import CommentForm from './CommentForm'
import EditPost from './EditPost'
import Comments from './Comments'

const Post = (props) => {

    const [post, setPost] = useState({})
    const [user, setUser] = useState("")
    const [commentError, setCommentError] = useState("")
    const [formFlag, setFormFlag] = useState(false)
    const [comments, setComments] = useState([])
    const [id, setId] = useState("")
    const [postUserId, setPostUserId] = useState("")
    


    useEffect(() => {
        fetch(`/posts/${props.match.params.post_id}`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setPost(data)
            setUser(data.user.username)
            setPostUserId(data.user.id)
        })
    }, [])


    
    const editPost = (p) => {
        fetch(`/posts/${props.match.params.post_id}`, {
            method: 'PATCH',
            body: JSON.stringify(p),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setFormFlag(false)
            setPost(data)
        })
    }

    //* Comments

    // get comments

    useEffect(() => {
        fetch(`/posts/${props.match.params.post_id}`)
        .then(r => r.json())
        .then(data => {
            console.log(data.comments)
            setComments( data.comments)
        })
    }, [])

    // add comments

    const addComment = (c) => {
        fetch(`/posts/${props.match.params.post_id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(c)
        })
        .then(r => r.json())
        .then(data => {
            if(data.errors) {
                console.log(data.errors) 
                setCommentError(data.errors)
            }else {
                console.log(data)
                setComments([...comments, data])
                setCommentError("")
            }
        })
    }

    // delete comments

    const deleteComment = (e) => {
        fetch(`/comments/${props.match.params.id}`, {
            method: "DELETE"
        })
        console.log(props.match.params.id)
        let id = props.match.params.id
        const arr = comments.filter(c => c.id != id)
        setComments(arr)
    }

    const commentsList = comments.map(c => <Comments delete={deleteComment} comment={c} key={c.id} post={post}/>)

    // get Id

    useEffect(() => {
        fetch('/me')
        .then(r => r.json())
        .then(data => {
            console.log(data.id)
            setId(data.id)
        })
        console.log(formFlag)
    }, [])

    const cancelEdit = () => {
        setFormFlag(false)
    }

    const deletePost = () => {
        fetch(`/posts/${props.match.params.post_id}`, {
            method: "DELETE"
        })
    }



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
                {formFlag ? <EditPost post={post} editPost={editPost} cancel={cancelEdit} /> :
                <button className="btn" onClick={() => setFormFlag(true)}><i className="fas fa-edit"></i></button>}
                <hr/>
                <CommentForm addComment={addComment} /> 
                {commentError}
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
