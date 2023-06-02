import React from "react";


export default function(props){

    const question = props.question


    return(
        <div className="question">
            <h2>{question.question}</h2>
            <div className="question--answers">
                {question.type === 'boolean' ? }
                <button className="options"></button>
                <button className="options"></button>
                <button className="options"></button>
                <button className="options"></button>
            </div>
            <hr />
        </div>
    )
}