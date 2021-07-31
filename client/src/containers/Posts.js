import React, {useState, useEffect} from 'react'
import PostLink from '../components/PostLink'
import AddPostForm from './AddPostForm'

const Posts = () => {

    const [posts, setPosts] = useState([])
    const [error, setError] = useState("")
    const [formFlag, setFormFlag] = useState(false)


    useEffect(() =>{
        fetch('/posts')
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setPosts(data)
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
            console.log(data)
            setPosts([data, ...posts])
            setFormFlag(false) 
        })
    }

    const postsList = posts.map(p => <PostLink key={p.id} post={p} />)

    return (
        <div className="posts">
            <br/>           
             {formFlag ?
                <AddPostForm addPost={addPost}/> :
                <button onClick={() => {setFormFlag(true)}}>Add Post</button>
            }
            <br/>
            <br/>
            {postsList}
        </div>
    )
}
export default Posts