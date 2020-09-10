import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {signup } from '../helpers/auth';
import { db } from '../services/firebase';

function SignUp(props){
    const [error, SetError] = useState('');
    const [fname,SetFName] = useState('');
    const [lname, SetLName] = useState('');
    const [username, SetUsername] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    
    const handleChange = e => {
        if(e.target.name ==='email'){
            SetEmail(e.target.value);
        }
        else if(e.target.name === 'password'){
            SetPassword(e.target.value);
        }else if (e.target.name ==='username'){
            SetUsername(e.target.value);
        }
    }
    const handleSubmit = async e => {
        e.preventDefault();

        try{
            await signup(email,password,username);
        }catch(err){
            SetError(err.message);
        }
    
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Sign up to
                    <Link to="/"> ChitChat</Link>
                </h1>

                {error ? <p>{error}</p> : null}
                <div>
                    <input placeholder="Username" name="username" onChange={handleChange} value={username}></input>
                </div>
                <div>
                    <input placeholder="Email" name="email" type="email" onChange={handleChange} value={email}></input>
                </div>
                <div>
                    <input placeholder="Password" name="password" onChange={handleChange} value={password} type="password"></input>
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
                <hr></hr>
                <div>
                    <p> Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignUp;