import React, {useState, useEffect} from 'react'
import PostLink from '../components/PostLink'
import AddPostForm from './AddPostForm'

const Posts = () => {

    const [posts, setPosts] = useState([])
    const [formFlag, setFormFlag] = useState(false)
    const [postError, setPostError] = useState([])
    const [error, setError] = useState("")


    useEffect(() =>{
        fetch('/posts')
        .then(r => r.json())
        .then(data => {
            if(data){
                if(data.error){
                    setError(data.error)
                }else {
                    console.log(data)
                    setPosts(data)
                }
            }else {
                setError("Post not Found")
            }
        })
    }, [])

    const addPost = (post) => {
        fetch('/posts', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(post)
        })
        .then(r => r.json())
        .then(data => {
            if(data.errors) {
                console.log(data.errors)
                setPostError(data.errors)
            }else {
                console.log(data)
                setPosts([data, ...posts])
                setPostError([])
                setFormFlag(false)
            }
        })
    }

    const cancelPost = () => {
        setFormFlag(false)
        setPostError([])
    }


    const postsList = posts.map(p => <PostLink id={p.id} key={p.id} post={p} user={p.user}/>)

    const errorList = postError.map(e => <div key={e.id}><li>{e}</li><br/></div>)

    if(error === "") {
        return (
            <div className="posts">
                <br/>           
                 {formFlag ?
                    <AddPostForm addPost={addPost} cancel={cancelPost}/> :
                    <div className="btn" onClick={() => {setFormFlag(true)}} title="Add Post"><i className="fas fa-plus"></i></div>
                }
                {errorList}
                <br/>
                <br/>
                {postsList}
            </div>
        )
    }else {
        return(
            <div>
                {error}
                <h1>Please Log in or Signup</h1>
            </div>
        )
    }
}
export default Posts