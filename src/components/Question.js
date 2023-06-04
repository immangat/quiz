import React from "react";
import '../styles/questions.css'
import Option from "./Option";
import {nanoid} from "nanoid";


export default function Question(props) {
    const question = props.question
    console.log(question)
    let {incorrect_answers : answersArray, correct_answer, checkedAnswer } = question
    answersArray.push(correct_answer)
    const [options, setOptions] = React.useState(makeOptionsObject())

    function makeOptionsObject() {

        return answersArray.map(option => {
            return (
            {
                key: nanoid(),
                option: option,
                //this might be redundant
                picked: question.pickedAnswer === option
            }
        )})


    }







    const buttons = options.map(object =>

    {

        return (
            <Option
                key = {object.key}
                value={object.option}
                handleClick={(e) => props.handleClick(e)}
                picked={question.pickedAnswer === object.option}
                correct = {object.option === correct_answer}
                checked = {checkedAnswer}
            />
        )}
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
