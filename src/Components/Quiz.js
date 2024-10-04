import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Components/Quiz.css';

const Quiz = () => {
  const [question, setQuestion] = useState(null);
  const [currentQuestionID, setCurrentQuestionID] = useState('Q001');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const fetchQuestion = async (questionID) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/getquizData', {
        params: { QuestionID: questionID },
      });
      
      if (response.data) {
        setQuestion(response.data);
      } else {
        setQuestion(null);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching question:', error);
      setError('Error fetching question.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion(currentQuestionID);
  }, [currentQuestionID]);

  const handleNextQuestion = () => {
    if (selectedAnswer === question.CorrectAnswer) {
      setScore(score + 1);
    }
    
    const nextQuestionID = getNextQuestionID(currentQuestionID);
    if (nextQuestionID === 'Q001') {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestionID(nextQuestionID);
      setSelectedAnswer('');
    }
  };

  const getNextQuestionID = (currentID) => {
    const questionIDs = ['Q001', 'Q002', 'Q003', 'Q004', 'Q005'];
    const currentIndex = questionIDs.indexOf(currentID);
    if (currentIndex < questionIDs.length - 1) {
      return questionIDs[currentIndex + 1];
    }
    return questionIDs[0];
  };

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (isQuizFinished) {
    return (
      <div className="quizFinished">
        <div className="scoreContainer">
          <h2>Quiz Finished</h2>
          <h2>Your Score: {score}</h2>
          <Link to="/"><button className="exitBtn">Exit</button></Link>
          
        </div>
      </div>
    );
  }

  if (!question) {
    return <div>No question found.</div>;
  }

  return (
    <div className="quizMain">
      <div className="quizQuestion">
        <h1 className="quizTitle">Quiz {question.QuestionID}</h1>
        <h2 className="quizText">{question.QuestionText}</h2>
        <form>
          {question.Options.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={handleAnswerSelect}
                />
                {option}
              </label>
            </div>
          ))}
        </form>
        <button onClick={handleNextQuestion} id="nextBtn">Next Question</button>
      </div>
    </div>
  );
};

export default Quiz;
