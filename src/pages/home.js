import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Chitchat!</h1>
      <p>An online chatroom built with react and firebase!</p>
      <Link to="/chat"><button>Go Chat!</button></Link>
    </div>
  );
}
export default Home;
