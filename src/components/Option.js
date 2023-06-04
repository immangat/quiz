import React from "react";
import '../styles/option.css'

function Option(props){
    const [isHover, setIsHover] = React.useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    function decideColor(){
        var color
        if(props.correct && props.checked){
            color = "#94D7A2"
        } else if(props.picked && props.checked){
            color = "#F8BCBC"
        }

        if((props.picked || isHover) && !props.checked){
            color = "#D6DBF5"
        } else if(!props.checked){
            color = "white"
        }
        return color
    }
    const styles = {
        backgroundColor : `${decideColor()}`

    }
    return(
        <button
            className="options"
            style={styles}
            onClick={(e) => props.handleClick(e)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {props.value}
        </button>
    )
}



export default Option