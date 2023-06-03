import React from "react";

function StartScreen(props) {
    return <div className="startScreen">
        <h1>Quizzical</h1>
        <p>Test your kwowledge on general level question across different topics</p>
        <button className="startButton" onClick={props.onClick}>Start Quiz</button>
    </div>;
}
export default StartScreen