import React from "react";
import '../styles/questions.css'
import Option from "./Option";
import {nanoid} from "nanoid";


export default function Question(props) {
    const question = props.question
    let {incorrect_answers : answersArray} = question
    let {correct_answer } = question
    answersArray.push(correct_answer)
    const [options, setOptions] = React.useState(makeOptionsObject())

    function makeOptionsObject() {

        return answersArray.map(option => {
            console.log( "inside making the object: " + `${question.pickedAnswer === option}`)
            return (
            {
                key: nanoid(),
                option: option,
                picked: question.pickedAnswer === option
            }
        )})


    }







    const buttons = options.map(object =>


    {
        console.log("Inside Buttons: " + object.picked)

        return (
            <Option
                key = {object.key}
                value={object.option}
                handleClick={(e) => props.handleClick(e)}
                picked={question.pickedAnswer === object.option}
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
