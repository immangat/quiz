
import './styles/App.css';
import React from 'react';
import {nanoid} from 'nanoid'
import Question from './components/Question';
import Loader from "./components/Loader";


function App() {

  const [gameStart, setGameStart] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [startScreen, setStartScreen] = React.useState(true)
  const [isInitialRender, setIsInitialRender] = React.useState(true);


  function setUpQuestions(questions) {

    const newArray = questions.map(prev => ({...prev, pickedAnswer : "", key : nanoid()}))
    setQuizData(newArray)
  }


  function startGame() {
    setStartScreen(false)
    setLoading(true)
  }

  function setPickedAnswer(key, e) {
    setQuizData(prev => prev.map(prevItem => (
        prevItem.key === key
            ? { ...prevItem, pickedAnswer: e.target.innerText === prevItem.pickedAnswer ? "" : e.target.innerText }
            : prevItem
    )));
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
      if (!isInitialRender) {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
              setUpQuestions(data.results)
            })
            .then(() => {
              setLoading(false)
              setGameStart(true)
            })
      } else {
        setIsInitialRender(false);
      }


    },[startScreen])

  return (
    <main className="App">
      <div className='app--content'>
        {
          startScreen &&

              <div className="startScreen">
                <h1>Quizzical</h1>
                <p>Test your kwowledge on general level question across different topics</p>
                <button className="startButton" onClick={startGame}>Start Quiz</button>
              </div>

        }
        {
            loading
            &&
            <Loader />
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
