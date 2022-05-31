import React from "react";


export default function Answer(props){
    const styles = {
        backgroundColor: props.isClicked ? "#D6DBF5" : "",
       
       
    }
    const correctStyle = {
            backgroundColor: props.isClicked === 'correct' ? "#94D7A2" : '' 
    }

    const wrongStyle = {
        backgroundColor: props.wrong === 'wrong' ? "#F8BCBC" : ''
    }
 

    return (
        <button 

            
            onClick={()=>props.clickAnswer(props.id)}
            id={props.id}
            style={props.isClicked === 'correct' ? correctStyle :
            props.wrong === 'wrong' ? wrongStyle : styles
        }
          >
              {props.answer}
          </button>


    )

}