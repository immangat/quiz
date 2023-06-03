import React from "react";
import '../styles/questions.css'
import Option from "./Option";
import {nanoid} from "nanoid";


export default function Question(props) {
    const question = props.question
    let answersArray = question.incorrect_answers
    answersArray.push(question.correct_answer)
    const [options, setOptions] = React.useState(makeOptionsObject())

    function makeOptionsObject() {

        return answersArray.map(option => {

            return (
            {
                key: nanoid(),
                option: option,
                picked: question.pickedAnswer === option
            }
        )})


    }






    const buttons = options.map(object => (
            <Option
                key = {object.key}
                value={object.option}
                handleClick={(e) => props.handleClick(e)}
                picked={object.picked}
            />
        )
    )

    const parser = new DOMParser();
    const decodedString = parser.parseFromString(`<!doctype html><body>${question.question}`, 'text/html').body.textContent;


    return (
        <div className="question">
            <h2>{decodedString}</h2>
            {buttons}

            <hr/>
        </div>
    )
}
