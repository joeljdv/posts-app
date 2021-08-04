import React from 'react'
import { NavLink, Link } from 'react-router-dom'
 

const Navbar = (props) => {

    if (props.loggedIn) {
        return (
            <div >
                <Link to={`/user/${props.user.id}`} className="nav_profile" >
                    <img className="profile_img" src={props.profileImg} />
                    <h2>{props.user.username}</h2>
                </Link>
                <br/>
                <table>
                    <tr>
                        <td>
                            <Link to='/signup'>  
                                <div className="btn" onClick={props.logoutUser}>Logout</div>
                            </Link>         
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Link to='/posts'>
                                <div className="btn">posts</div>
                            </Link>
                        </td>
                    </tr>
                </table>
            </div>
            
        )
    }else {
        return (
            <div>
                <table>
                    <tr>
                        <td>
                            <Link to="/signup">
                                <div className="btn">Signup</div>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>
                <Link to='/login'>
                    <div className="btn">Login</div>
                </Link>
                        </td>
                    </tr>
                </table>
            </div>
    ) 
    }

   
}

export default Navbar