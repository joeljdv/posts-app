import React, { useState } from 'react'


const Signup = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [img, setImg] = useState("")
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                password_confirmation: passwordConfirmation,
                profile_img: img
            })
        })
        .then(r => r.json())
        .then(user => {
            if(user.errors){
                console.log(user.errors)
                setErrors(user.errors)
            }else {
                console.log("logged in")
                props.loginUser(user)
            }
        })
    }

    const handleClick = (e) => {
        console.log(e.target.src)
        setImg(e.target.src)
    }

    const errorList = errors.map(e => <li>{e}</li>)

    if(props.loggedIn){
        return (
            <div>   
            </div>
        )
    }else {

        return (
            <div>   
               <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input 
                    type="text" 
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <br/>
                    <label>Password</label>
                    <input 
                    type="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                    <br/>
                    <label>Confirm Password</label>
                    <input 
                    type="password" 
                    id="password_confirmarion"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                    <br/>
                    <input type="submit"/>
                </form>
                <img onClick={handleClick} tabindex="1"  className="avatar"src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-black-7-512.png"/>
                <img onClick={handleClick} tabindex="2" className="avatar"src="https://i0.wp.com/i.ya-webdesign.com/images/girl-avatar-png-19.png" />
                <img onClick={handleClick} tabindex="3" className="avatar"src="https://www.maxpixel.net/static/photo/640/Icon-Female-Avatar-Female-Icon-Red-Icon-Avatar-6007530.png"/>
                <br/>
                <img onClick={handleClick} tabindex="4" className="avatar" src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                <img onClick={handleClick} tabindex="5" className="avatar" src="https://freepngimg.com/download/facebook/62681-flat-icons-face-computer-design-avatar-icon.png"/>
                <img onClick={handleClick} tabindex="6" className="avatar" src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-black-7-512.png"/>
                {errors ? <div>{errorList}</div> : null}  
            </div>
           
        )   
    }

}

export default Signup