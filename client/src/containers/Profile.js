import React, { useState, useEffect } from 'react'
import Post from './Post'
import PostLink from '../components/PostLink'
import AddPostForm from './AddPostForm'

function Profile(props) {

    const [posts, setPosts] = useState([])
    const [formFlag, setFormFlag] = useState(false)
    const [postError, setPostError] = useState([])
    const [user, setUser] = useState({})
    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch(`/user/${props.match.params.id}`)
        .then(r => r.json())
        .then(data => {
            if(data) {
                if(data.error) {
                    setErrors(data.error)
                }else {
                console.log(data.posts)
                setPosts(data.posts)           
                setUser(data)
                }
            }
        })
    }, [])

    // useEffect(() => {
    //     fetch("/me")
    //     .then(r => r.json())
    //     .then(data => {
    //         setUser(data)
    //         console.log(data)
    //     })
    // }, [])
    
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





    const postsList = posts.map(p => <PostLink  key={p.id} post={p} user={user} />)

    const errorList = postError.map(e => <div key={e.id}><li>{e}</li><br/></div>)

    return (
        <div>
            <img className="profile_img" src={user.profile_img}/>
            <h2>{user.username}</h2>
            <div className="posts">
                <br/>           
                {formFlag ?
                    <AddPostForm addPost={addPost} cancel={cancelPost}/> :
                    <button onClick={() => {setFormFlag(true)}} title="Add Post"><i className="fas fa-plus"></i></button>
                }
                {errorList}
                <br/>
                <br/>
                {postsList}
            </div>
        </div>
    )
}

export default Profile