import React, {useState, useEffect, useContext} from "react"
import './global.scss';
import data from "./Data/data.json"
import Navbar from "./Components/Nav/Navbar";
import Player1Cards from "./Components/Player1Cards/Player1Cards";
import Player2Cards from "./Components/Player2Cards/Player2Cards";
import Grid from "./Components/Grid/Grid";
import { v4 as uuidv4 } from 'uuid'
import {GameContext} from "./Context/GameContext"

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


function App() {
  const [player1Cards, setPlayer1Cards] = useState([])
  const [player2Cards, setPlayer2Cards] = useState([])
  const [score1, setScore1] = useState()
  const [score2, setScore2] = useState()
  const [loading, setLoading] = useState(false)
  const [selectedCard, setSelectedCard, player1Turn, setPlayer1Turn] = useContext(GameContext)
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
 let arr = []
 let arr2 = []
  
  const getPlayerTurn = () => {
    let random = Math.floor((Math.random() * 2) +1)
    if (random === 1) {
      setPlayer1Turn(true)
    } if (random === 2) {
      setPlayer1Turn(false)
    }
  }


  const getPlayer1Cards = () => {
    setLoading(true)
  for(let i=1; i<=5; i++) {
    let random = Math.floor(Math.random() * data.cards.length)
     arr.push(data.cards[random])
   }
   let epicArr = arr.map(item => ({...item, id:uuidv4(), player1: true}))
   setPlayer1Cards(epicArr)
   setLoading(false)
  }

  const getPlayer2Cards = () => {
    setLoading(true)
    for(let i=1; i<=5; i++) {
      let random = Math.floor(Math.random() * data.cards.length)
       arr2.push(data.cards[random])
     }
     let epicArr = arr2.map(item => ({...item, id:uuidv4(), player1: false}))
     setPlayer2Cards(epicArr)
     setLoading(false)
    }



  useEffect(() => {
    setLoading(true)
    getPlayerTurn()
    getPlayer1Cards()
    getPlayer2Cards()
    setLoading(false)
    function handleResize() {
      setWindowDimensions((getWindowDimensions()))
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    
  }, [])

  return (
    <div className="App">
      <Navbar />
      <div>
        {window.innerWidth < 1000 ? 
        <div className="app-wrapper">
          {player1Turn ? <Player1Cards loading={loading} player1Cards={player1Cards} score1={score1} /> 
          :
          <Player2Cards loading={loading} player2Cards={player2Cards} score2={score2} />}
          <Grid setLoading={setLoading} loading={loading} getPlayer1Cards={getPlayer1Cards} getPlayer2Cards={getPlayer2Cards} player1Cards={player1Cards} setPlayer1Cards={setPlayer1Cards} player2Cards={player2Cards} setPlayer2Cards={setPlayer2Cards} score1={score1} setScore1={setScore1} score2={score2} setScore2={setScore2} />
        </div>

        : window.innerWidth >= 1000 ?
        <div className="app-wrapper">
          <Player1Cards loading={loading} player1Cards={player1Cards} score1={score1} /> 
          <Grid setLoading={setLoading} loading={loading} getPlayer1Cards={getPlayer1Cards} getPlayer2Cards={getPlayer2Cards} player1Cards={player1Cards} setPlayer1Cards={setPlayer1Cards} player2Cards={player2Cards} setPlayer2Cards={setPlayer2Cards} score1={score1} setScore1={setScore1} score2={score2} setScore2={setScore2} />
          <Player2Cards loading={loading} player2Cards={player2Cards} score2={score2} />
        </div>
       : null}
        
      </div>
    </div>
  );
}

export default App;
