import React, {Component, useEffect, useState} from "react";
import {Input, Button, Col, Row  } from "antd";
import {auth, db} from "../services/firebase";

import '../style/chat-section.scss';

function ChatSection(props){
    const [user, SetUser] = useState(auth().currentUser);
    const [chats, SetChats] = useState([]);
    const [msg, SetMsg] = useState('');
    const [readError, SetReadError] = useState(null);
    const [writeError, SetWriteError] = useState(null);

    useEffect( ()=> {
        SetReadError(null);
        try{
            // .on opens a live connection to firebase so messages will be updated in real time
            db.collection("chats").orderBy('timestamp').onSnapshot((snapshot) => {
                let chatMsgs = [];
                snapshot.forEach((snap) => {
                    chatMsgs.push(snap.data());
                });
                SetChats(chatMsgs);
            })
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
            await db.collection("chats").add({
                content: msg,
                timestamp: Date.now(),
                uid: user.uid
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
                    return <div className={user.uid == chat.uid ? 'chat-sent': 'chat-received'}>
                        <h3>{chat.uid?<strong>{chat.uid} </strong>:null} </h3>
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