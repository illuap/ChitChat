
import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {signin, signInWithGoogle } from '../helpers/auth';

function Login(props){
    const [error, SetError] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    
    const handleChange = e => {
        if(e.name =='email'){
            SetEmail(e.value);
        }
        else if(e.name == 'password'){
            SetPassword(e.value);
        }
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try{
            await signin(email,password);
        }catch(err){
            SetError(err.message);
        }
    };
    const googleSignIn = async e => {
        try{
            await signInWithGoogle();
        } catch(err){
            SetError(err.message);
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login to
                    <Link to="/"> ChitChat</Link>
                </h1>

                {error ? <p>{error}</p> : null}

                <div>
                    <input placeholder="Email" name="email" type="email" onChange={handleChange} value={email}></input>
                </div>
                <div>
                    <input placeholder="Password" name="password" onChange={handleChange} value={password} type="password"></input>
                </div>
                <div>
                    <button type="submit">Sign In</button>
                </div>
                <hr></hr>
                <div>
                    <p> Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    <p>OR</p>
                    <button onClick={googleSignIn} type="button">
                        Sign up with Google
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login;