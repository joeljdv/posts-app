
import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as  Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Posts from './containers/Posts';
import Post from './containers/Post';
import Profile from "./containers/Profile"


function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [image, setImage] = useState("")
  const [id, setId] = useState("")
  // const [isVisible, setIsVisible] = useState(false)
 


  useEffect( () => {
    fetch('/me')
    .then(r => {
      if (r.ok){
        r.json()
        .then(u => {
          setLoggedIn(true)
          setUser(u)
          setImage(u.profile_img)
        })
      }
    })
  }, [])

  const loginUser = (user) => {
    setLoggedIn(true)
    setUser(user)
    setImage(user.profile_img)
  }

  const logoutUser = () => {
    fetch('/logout', {
      method:'DELETE'
    })
    .then(() => {
      console.log("Logged out")
      setLoggedIn(false)
      setUser({})
      setImage("")
    })
  }

  // const handleVisible = () => {
  //   if(isVisible){
  //     setIsVisible(false)
  //   }else {
  //     setIsVisible(true)
  //   }
  // }

  return (
    <div className="row">
      <div className="column left"> 
      </div>
      <div className="header">
        <h1>PostIt</h1>
      </div>
      <div className="column middle">
        <br/>
        <Switch>
          <Route exact path="/user/:id" component={Profile} />
          <Route exact path="/signup" render={routerProps => <Signup {...routerProps} loginUser={loginUser} loggedIn={loggedIn}/>} />
          <Route exact path="/login" render={routerProps => <Login {...routerProps} loginUser={loginUser} loggedIn={loggedIn}/>}>
            {loggedIn ? <Redirect to="/posts"/> :  <Login loginUser={loginUser} loggedIn={loggedIn}/>}
          </Route>
          <Route exact path="/posts" component={Posts}/>
          <Route exact path="/posts/:post_id/comments" component={Post} />
          <Route path="/posts/:post_id/comments/:id" component={Post} />
        </Switch>
      </div>
      <div className ="column right">
        {/* <p className="btn"><i className="fas fa-bars" onClick={handleVisible}></i></p> */}
        {/* {isVisible ? <Navbar user={user} loggedIn={loggedIn} logoutUser={logoutUser} profileImg={image} visible={handleVisible} /> : null} */}
        <Navbar user={user} loggedIn={loggedIn} logoutUser={logoutUser} profileImg={image}  />
      </div>
    </div>
  );
}

export default App;