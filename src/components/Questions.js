import React from 'react';
import Answer from './Answer';
import { nanoid } from 'nanoid';

export default function Questions(props){

    let answerArray = props.answers.map((answer)=>{
        return answer

    })

    

    let newArray = answerArray.map(answer=>{
        return answer.map(ans=>{
            return <Answer
                answer={ans.answer} 
                id={ans.id}
                isClicked={ans.isClicked}
                key={ans.id} 
                clickAnswer={props.clickAnswer}
                wrong={ans.wrong}
                />
        })
    })


 
    const questionsArray = props.questions.map((question, i)=>{
       
        const finalArray = newArray[i]
       

        return (
            <div className='quest-body' key={nanoid()}>
                <h3>{question}</h3>
                <div className='answers'>
                       {finalArray}
                </div>
            </div>
        )

    })

    return (
        <div className='all-questions'>
            {questionsArray}
        </div>
    )

}