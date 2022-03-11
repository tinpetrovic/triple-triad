import React, {useState, useContext} from 'react'
import "./navbar.scss"
import {GameContext} from "../../Context/GameContext"

export default function Navbar() {
  const [selectedCard, setSelectedCard, player1Turn] = useContext(GameContext)
  const [rules, setRules] = useState(false)

  const readRules = () => {
    setRules(!rules)
  }

  return (
    <div className='navbar-container'>
      <h2>TRIPLE TRIAD</h2>
      <div className='info'>
              <button onClick={readRules} className='btn btn-secondary'>Rules</button>
              {player1Turn ? <h3 className='turn1'>Player 1 Turn</h3> : <h3 className='turn2'>Player 2 Turn</h3>}
      </div>

      {rules && 
      <div className='rules'>
        <div className='rules-wrapp'>
        <button onClick={readRules} className="btn btn-secondary" >Close</button>
          <h2>TRIPLE TRIAD</h2>
          <div className='rules-text'>
            <h2>1. Basic Rules</h2>
            <p>Triple Triad is played on a three-by-three (3x3) square grid of blank spaces where the cards will be placed. Each card has four numbers (known as ranks) placed in the top left corner; each number corresponds to one of the four sides of the card. 
              The ranks range from one to ten, with the letter A representing ten. Red cards belong to the Player 2 and blue cards belong to the Player 1.
              In a basic game, each player has five cards. A coin-flip decides who begins. The player who wins the coin toss may choose a card to play anywhere on the grid. After the first card is played, the opponent may play a card on any unoccupied space on the board. The game continues with players' turns alternating.</p>
          
              <h2>2. Winning</h2>
              <p>To win, a majority of the total 9 cards played must be of the player's card color. To capture a card, the active player places a card adjacent to the opponent's card. If the rank touching the opponent's card is higher, the opponent's card will be captured and flipped into the active player's color. A card can be placed on any open spot on the board. 
              Each player may play one card per turn. A draw occurs if at the end should the player and the opponent possess equal numbers of cards of their color.</p>
          </div>
        </div>
      </div>}
    </div>
  )
}
