import React, { useState, useEffect } from 'react'
import Post from './Post'
import PostLink from '../components/PostLink'
import AddPostForm from './AddPostForm'

function Profile() {

    const [posts, setPosts] = useState([])
    const [formFlag, setFormFlag] = useState(false)
    const [postError, setPostError] = useState([])
    const [user, setUser] = useState({})
    const [clicked, setClicked] = useState(false)
    const [image, setImage] = useState("")

    useEffect(() => {
        fetch("/user/posts")
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setPosts(data)
        })
    }, [])

    useEffect(() => {
        fetch("/me")
        .then(r => r.json())
        .then(data => {
            setUser(data)
            console.log(data)
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





    const postsList = posts.map(p => <PostLink  key={p.id} post={p} />)

    const errorList = postError.map(e => <div key={e.id}><li>{e}</li><br/></div>)

    if(user.profile_img === null){
        return (
            <div>
                <img className="profile_img" src={"https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"} />  
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
    } else {
        return (
            <div>
                <img />
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
}

export default Profile