import React, { useState } from 'react'


const Login= (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then(r => r.json())
        .then(data => {
            if(data.error){
                console.log(data.error)
                setError(data.error)
            }else {
                console.log('Logged in')
                props.loginUser(data)
            }
        })
    }

  

    if(props.loggedIn){
        return (
            <div>   
            </div>
        )
    }else  {

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
                    <input type="submit"/>
                </form>
                {error ? <div>{error} -- Please try again</div> : null}
            </div> 
        )   
    }
        
}

export default Login