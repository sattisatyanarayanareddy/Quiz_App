import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdRocket } from 'react-icons/io'; 
import '../Components/Welcome.css';

const Welcome = () => {
  return (
    <div className='mainContainer'>
      <div className='container1'>
        <IoMdRocket className="rocketIcon" /> 
        <h2>Welcome To Quiz Application</h2>
        <p>Take a General Quiz and get your Score</p>
        <Link to="/quiz"><button id='startBtn'>Start Quiz</button></Link>
      </div>
    </div>
  );
};

export default Welcome;
