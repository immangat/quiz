import React from "react";


function Option(props){
    console.log(props)
    const styles = {
        backgroundColor : props.picked ? "#D6DBF5" : "white"
    }
    return(
        <button className="options" style={styles} onClick={(e) => props.handleClick(e)}>{props.value}</button>
    )
}



export default Option