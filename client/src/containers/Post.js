import React, {useState, useEffect} from 'react'
import { Link} from 'react-router-dom'
import CommentForm from './CommentForm'
import EditPost from './EditPost'
import Comments from './Comments'

const Post = (props) => {

    const [post, setPost] = useState({})
    const [user, setUser] = useState("")
    const [commentError, setCommentError] = useState("")
    const [error, setError] = useState("")
    const [formFlag, setFormFlag] = useState(false)
    const [comments, setComments] = useState([])
    const [id, setId] = useState("")
    const [postUserId, setPostUserId] = useState("")
    


    useEffect(() => {
        fetch(`/posts/${props.match.params.post_id}`)
        .then(r => r.json())
        .then(data => {
                if(data) {
                    if(data.error) {
                        setError(data.error)
                    }else {
                        console.log(data)
                        setPost(data)
                        setUser(data.user)
                        setPostUserId(data.user.id)
                    }
                }else {
                    setError("No Post Found")
                }
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
            if(data.error) {
                console.log(data)
            }else {
                console.log(data.comments)
                setComments( data.comments)
            }
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

    if(error === "") {
        if(postUserId === id) {
            return (
                <div className="single_post">
                    <div className="single_post_inf">
                        <div className="single_post_inf user">
                            <Link to={`/user/${user.id}`}>
                                <img className="profile_img" src ={user.profile_img}/>
                                <h3> Posted by {user.username}</h3>
                            </Link>
                        </div>
                        <div className="single_post_inf content">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </div>
                    </div>
                    <Link to="/posts">
                        <div className="btn" onClick={deletePost}><i className="fa fa-trash"></i></div>
                    </Link>  
                    {formFlag ? <EditPost post={post} editPost={editPost} cancel={cancelEdit} /> :
                        <div className="btn" onClick={() => setFormFlag(true)}><i className="fas fa-edit"></i></div>}
                    <CommentForm addComment={addComment} /> 
                    {commentError}
                    <br/>
                    <div className="comments">
                        {commentsList}
                    </div>
                </div>
        )
        }else {
            return (
                <div className="single_post">
                    <div className="single_post_inf">
                        <div className="single_post_inf user">
                            <Link to={`/user/${user.id}`}>
                                <img className="profile_img" src ={user.profile_img}/>
                                <h3> Posted by {user.username}</h3>
                            </Link>
                        </div>
                        <div className="single_post_inf content">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </div>
                    </div>
                       <CommentForm addComment={addComment} />
                    <br/>
                    <div className="comments">
                        {commentsList}
                    </div>
                </div> 
            )
    
        }

    }else {
        return(
        <div>
            {error}
            <Link to="/posts">
                <div title="Back to Posts"><i className="fas fa-arrow-circle-left"></i></div>
            </Link>
        </div>
        )
    }



}
export default Post
