import React, {Component, useState, useEffect} from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from './pages/home';
import Chat from './pages/chat';
import Signup from './pages/signup';
import Login from './pages/login';
import {auth} from './services/firebase';
import logo from './logo.svg';
import './App.css';

function PrivateRoute({component: Component, authenticated, ...rest}){
  return(
    <Route {...rest}
    render={(props) => authenticated === true
    ? <Component {...props}/>
    : <Redirect to={{pathname: '/login', state: {from: props.location} }} />}
    />
  )
}

function PublicRoute({component: Component, authenticated, ...rest}){
  return(
    <Route {...rest}
    render={(props) => authenticated === false
    ? <Component {...props}/>
    : <Redirect to='/chat' />}
    />
  )
}

function App() {
  const [authenticated, SetAuthenticated] = useState(false);
  const [loading, SetLoading] = useState(true);

  useEffect(()=>{
    auth().onAuthStateChanged((user => {
      if(user) {
        SetAuthenticated(true);
        SetLoading(false);
      } else {
        SetAuthenticated(false);
        SetLoading(false);
      }
    }))
  },[])

  return (
    loading === true
    ? <h2>Loading...</h2> //todo nice full screen spinner
    : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <PrivateRoute path="/chat" authenticated={authenticated} component={Chat}></PrivateRoute>
          <PublicRoute path="/signup" authenticated={authenticated} component={Signup}></PublicRoute>
          <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
        </Switch>
      </Router>
    )
  )
}

export default App;
