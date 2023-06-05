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
  const [checkAnswer, setCheckAnswer] = React.useState(
      {
                  number_of_correct_answers: 0,
                  checkedAnswer : false
                }
  )


  function setUpQuestions(questions) {

    const newArray = questions.map(prev => ({...prev, pickedAnswer : "", key : nanoid(), checkedAnswer : false}))
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

  function checkAnswers(){
    const correctQuestions = quizData.filter(question =>
    {
      const {pickedAnswer, correct_answer } = question
      return pickedAnswer === correct_answer
    })


    setCheckAnswer(prev =>
        (
            {
              checkedAnswer: true,
              number_of_correct_answers: correctQuestions.length
            }
        ))
    const newArray = quizData.map(prev => ({...prev, checkedAnswer : true}))
    setQuizData(newArray)

  }
  
  function reset() {
      setCheckAnswer(prev =>
          (
              {
                  checkedAnswer: false,
                  number_of_correct_answers: 0
              }
          ))
      setLoading(true)
      setGameStart(false)
      getQuizDataFromWeb();


  }

    function getQuizDataFromWeb() {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                setUpQuestions(data.results)
            })
            .then(() => {
                setLoading(false)
                setGameStart(true)
            })
    }

    React.useEffect(
    () => {
      if (!isInitialRender) {
        getQuizDataFromWeb();
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
                <p>Test your knowledge on general level question across different topics</p>
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
            <div className="footer">
            <p className="footer--answer">
                {checkAnswer.checkedAnswer ? `You got ${checkAnswer.number_of_correct_answers}/5 questions correct` : ""}
            </p>
                <div className="footer--button">
                    <button className="checkAnswers" onClick={checkAnswer.checkedAnswer ? reset : checkAnswers}>
                        {checkAnswer.checkedAnswer ? "Play Again" : "Check Answers"}
                    </button>
                </div>
            </div>
            }

      </div>

        <div className="circle" id="circle1"></div>
        <div className="circle" id="circle2" ></div>
    </main>
  );
}

export default App;
