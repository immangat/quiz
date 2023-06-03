
import './styles/App.css';
import React from 'react';
import {nanoid} from 'nanoid'
import Question from './components/Question';
import * as PropTypes from "prop-types";
import StartScreen  from "./components/StartScreen";


StartScreen.propTypes = {onClick: PropTypes.func};

function App() {

  const [gameStart, setGameStart] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])


  function setUpQuestions(questions) {

    const newArray = questions.map(prev => ({...prev, pickedAnswer : "", key : nanoid()}))
    setQuizData(newArray)
  }


  function startGame() {
    setGameStart(true)
  }

  function setPickedAnswer(key, e){
    setQuizData(prev => prev.map(prev => (prev.key === key ? {...prev, pickedAnswer : e.target.innerText } : prev)))
  }
  
  const questions = quizData.map(question => {
    return (
      <Question 
        question = {question}
        handleClick = {(e) => {setPickedAnswer(question.key, e)}}
        key = {question.key}
      />
    )
  })

  React.useEffect(
    () => {
      fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setUpQuestions(data.results) )
    },[])

  return (
    <main className="App">
      <div className='app--content'>
        {
          !gameStart &&

              <div className="startScreen">
                <h1>Quizzical</h1>
                <p>Test your kwowledge on general level question across different topics</p>
                <button className="startButton" onClick={startGame}>Start Quiz</button>
              </div>

        }
        {
          gameStart
            &&
            <div className="questions">
              {questions}
            </div>

        }
        {
          gameStart
            &&
            <button className="startButton">Check Answers</button>
        }

      </div>
    </main>
  );
}

export default App;
