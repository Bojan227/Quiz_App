
import './App.css';
import yellowCircle from './images/right-pic.png'
import blueCircle from './images/left-pic.png'
import Questions from './components/Questions';
import React from 'react'
import { nanoid } from 'nanoid'

function App() {
    const [startGame, setStartGame] = React.useState(false)
    const [endGame, setEndGame] = React.useState(false)
    const [questions, setQuestions] = React.useState(()=>[])
    const [answers, setAnswers] = React.useState([])
    const [correctAnswers, setCorrectAnswers] = React.useState([])
    const [countCorrectAnswers, setCountCorrectAnswers] = React.useState([])
    const [fetchAgain, setFetchAgain] = React.useState(0)


    React.useEffect(()=>{
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
          .then(res=>res.json())
          .then(data=>{
            setQuestions([...data.results.map(quest=>{

              return quest.question

            })])

            setCorrectAnswers([...data.results.map(corr=>{
              return corr.correct_answer
            })])

            setAnswers(()=>{
              const answersArray = data.results.map(data=>{

                return [...data.incorrect_answers, data.correct_answer]
                          .sort(()=> Math.random() - 0.5)

              })

             return answersArray.map(answer=>{
               return answer.map(ans=>{
                  return {
                    answer: ans,
                    isClicked: false,
                    id: nanoid(),
                    correct: ''
                  }
               })
             })
            })



          })



    }, [fetchAgain])


    function playGame(){
      setStartGame(prevState=>!prevState)
    }

    function clickAnswer(id){
      setAnswers(prevState=>{
       return prevState.map(answer=>{
         return answer.map(ans=>{
           
            if(ans.id === id){
              return {
                ...ans,
                isClicked: !ans.isClicked
              }

            }else{
              return ans
            }

          })
        })
      })
    }

    function checkAnswers(){

      setEndGame(prevState=>!prevState)
     

      correctAnswers.map(corr=>{

           setAnswers(prevState=>{
                
              return prevState.map(answer=>{
                 return answer.map(ans=>{
                    
                      if(ans.isClicked && ans.answer === corr){
                          setCountCorrectAnswers(prevState=>{
                            return [...prevState, ans.id]
                          })

                        return {
                          ...ans,
                          isClicked: 'correct'
                        }
                      }else if(ans.isClicked && ans.answer !== corr){
                        return {
                          ...ans,
                          wrong: 'wrong',
                        }
                      }else if(!ans.isClicked && ans.answer === corr){
                        return {
                          ...ans,
                          isClicked: 'correct',

                        }
                      }else{
                        return ans
                      }

                  })
                })

            })

          })

          function countAnswers(){
            
              answers.forEach(answer=>{
                 answer.forEach(ans=>{
                  if(ans.isClicked ==='correct'){
                    setCountCorrectAnswers(prevVal=>prevVal+1)
                  }
                })
              })
              
          }
          countAnswers()

          

    }

    function startAgain(){
        setFetchAgain(prevVal=>prevVal + 1)
        setCountCorrectAnswers([])
        setEndGame(prevState=>!prevState)
    }

  



  return (
    <main>
        <div className={`start-screen ${startGame ? "invisible" : ""}`}>
          
            <h1>Quizzical</h1>
            <h5>Some description if needed</h5>
            <button onClick={playGame} >Start Quiz</button>
            

        </div>
        <img src={yellowCircle} className="yellowCir" alt='yellowCir'/>
        <img src={blueCircle}  className='blueCir' alt='blueCir' />

        <div className='answers-container'>
             {startGame && <Questions  questions={questions} answers={answers} clickAnswer={clickAnswer} /> }
             <div className='end-game'>
             {endGame && <h1 >You scored {[...new Set(countCorrectAnswers)].length}/5 correct answers</h1>}
            
             {startGame && 
             
             <button className='check-btn' 
             
             onClick={endGame ? startAgain : checkAnswers}>

               {endGame ? 'Play Again' : "Check Answers"}

               </button>
               }
             
              </div> 
             
             
        </div>

    </main>
  );
}

export default App;