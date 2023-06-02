import React from "react";


export default function Question(props){

    const question = props.question
    let answersArray = question.incorrect_answers
    answersArray.push(question.correct_answer)

    return(
        <div className="question">
            <h2>{question.question.replaceAll("&quot;", " \"")}</h2>
                {question.type === 'boolean' ?
                    <div className="question--answers">
                        <button className="options" id="true">True</button>
                        <button className="options" id ="false">False</button>
                    </div>
                    :
                    <div className="question--answers">
                    <button className="options" onClick={(e) => props.handleClick(e)}>{answersArray[0]}</button>
                    <button className="options" onClick={(e) => props.handleClick(e)}>{answersArray[1]}</button>
                    <button className="options" onClick={(e) => props.handleClick(e)}>{answersArray[2]}</button>
                    <button className="options" onClick={(e) => props.handleClick(e)}>{answersArray[3]}</button>
                    </div>
                }

            <hr />
        </div>
    )
}