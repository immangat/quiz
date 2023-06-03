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

    const styles = {
        backgroundColor : props.picked || isHover ? "#D6DBF5" : "white",

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