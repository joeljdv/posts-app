
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
 


useEffect( () => {
  fetch('/me')
  .then(r => {
    if (r.ok){
      r.json()
      .then(u => {
        setLoggedIn(true)
        setUser(u)
      })
    }
  })
}, [])

const loginUser = (user) => {
  setLoggedIn(true)
  setUser(user)
}

const logoutUser = () => {
  fetch('/logout', {
    method:'DELETE'
  })
  .then(() => {
    console.log("Logged out")
    setLoggedIn(false)
    setUser({})
  })
}
  return (
    <div className="row">
      <div className="column left"> 
      <h1>H</h1>
      </div>
      <div className="column middle">
        <Navbar user={user} loggedIn={loggedIn} logoutUser={logoutUser} />
        <br/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" render={routerProps => <Signup {...routerProps} loginUser={loginUser} loggedIn={loggedIn}/>} />
          <Route exact path="/login" render={routerProps => <Login {...routerProps} loginUser={loginUser} loggedIn={loggedIn}/>}>
            {loggedIn ? <Redirect to="/user"/> :  <Login loginUser={loginUser} loggedIn={loggedIn}/>}
          </Route>
          <Route exact path="/posts" component={Posts}/>
          <Route exact path="/posts/:post_id/comments" component={Post} />
          <Route path="/posts/:post_id/comments/:id" component={Post} />
          <Route path="/user" component={Profile}/>
        </Switch>
      </div>
      <div className ="column right">
        <h1>H</h1>
      </div>
    </div>
  );
}

export default App;