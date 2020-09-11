import React, {Component, useEffect, useState} from "react";
import {Input, Button, Col, Row  } from "antd";
import {auth, db} from "../services/firebase";

import '../style/chat-section.scss';

function ChatSection(props){
    const [user, SetUser] = useState(auth().currentUser);
    const [username, SetUsername] = useState('');
    const [chats, SetChats] = useState([]);
    const [msg, SetMsg] = useState('');
    const [readError, SetReadError] = useState(null);
    const [writeError, SetWriteError] = useState(null);
    const [loaded, SetLoaded] = useState(false);

    useEffect( ()=> {
        SetReadError(null);
        try{
            // .on opens a live connection to firebase so messages will be updated in real time
            db.collection("chats").orderBy('timestamp').onSnapshot((snapshot) => {
                let chatMsgs = [];
                snapshot.forEach((snap) => {
                    const msg = snap.data();
                    chatMsgs.push(msg);
                });
                SetChats(chatMsgs);
            });
            // fetch the current logged in user's name
            db.collection("users").doc(user.uid).get().then(u => {
                // help fix and issue with new users not have their user data in the db yet.
                if(u.data().username !== undefined){
                    SetUsername(u.data().username);
                }
            }).catch();
            SetLoaded(true);
        }catch (err){
            SetReadError(err.message);
        }
    }, []);
    
    const handleChange = e =>{
        console.log(e);
        SetMsg(e.target.value);
    }
    const handleSubmit = async e =>{
        e.preventDefault();
        SetWriteError(null);
        try{
            // check if username is set to fetch.
            if(username == ''){
                db.collection("users").doc(user.uid).get().then(u => {
                    SetUsername(u.data().username);
                }).catch(); 
            }
            const userDBRef = db.doc("users/" + user.uid);
            console.log(userDBRef)
            await db.collection("chats").add({
                content: msg,
                timestamp: Date.now(),
                userRef: userDBRef,
                username: username
            });
            SetMsg('');
        }catch (err){
            SetWriteError(err.message);
        }
    }
    return(
        <div className="chat-wrapper">
            <h1>Chat Room: </h1>
            <hr></hr>
            <div className="chats">
                {chats.map(chat => {
                    return <div className={user.uid == chat.userRef.id ? 'chat-sent': 'chat-received'}>
                        <h3>{<strong>{chat.username} </strong>} </h3>
                        <p className="message" key={chat.timestamp}> 
                        {chat.content} - {new Date(chat.timestamp).toLocaleString()}
                        </p>
                    </div>
                })}
                {readError ?<p>{readError}</p>: null}
            </div>
            <div className="message-input">
                <form onSubmit={handleSubmit}>
                    <Row>
                    <Col span={18}>
                        <Input onChange={handleChange} value={msg}></Input>
                        {writeError ?<p>{writeError}</p>: null}
                    </Col>
                    <Col span={6}>
                        <Button block type="primary" htmlType="submit">Send</Button>
                    </Col>
                    </Row>
                </form>
            </div>
            <div>
                Login in as: <strong> {user.email}</strong>
            </div>
        </div>
    );
}

export default ChatSection;