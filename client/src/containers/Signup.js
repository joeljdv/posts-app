import React, { useState } from 'react'


const Signup = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
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
                password_confirmation: passwordConfirmation
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
                {errors ? <div>{errorList}</div> : null}  
            </div>
           
        )   
    }

}

export default Signup