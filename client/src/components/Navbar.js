import React from 'react'
import { NavLink, Link } from 'react-router-dom'
 

const Navbar = (props) => {

    if (props.loggedIn) {
        return (
            <div>
                <Link to={`/user/${props.user.id}`}>
                    <img className="profile_img" src={props.profileImg} />
                    <h2>{props.user.username}</h2>
                </Link>
                <br/>
                <Link to='/'>  
                    <button onClick={props.logoutUser}>Logout</button>
                </Link>         
                <Link to='/posts'>
                    <button>posts</button>
                </Link>
                <hr/>
            </div>
            
        )
    }else {
        return (
            <div>
                <Link to="/signup">
                    <button>Signup</button>
                </Link>
                <Link to='/login'>
                    <button>Login</button>
                </Link>
                <hr/>
            </div>
    ) 
    }

   
}

export default Navbar