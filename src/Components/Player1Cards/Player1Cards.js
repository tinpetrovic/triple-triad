import React, {useContext} from 'react'
import "./playerCards.scss"
import {GameContext} from "../../Context/GameContext"

export default function Player1Cards({loading, player1Cards}) {
  const [selectedCard, setSelectedCard, player1Turn, setPlayer1Turn] = useContext(GameContext)

  const selectCard = (id) => {
    if(player1Turn) {
    const cr = player1Cards.find(card => card.id === id)
    setSelectedCard(cr)
    }
  } 


  return (
    <div className='player1Cards'>
        <h4>Player 1 Cards:</h4>
        {loading ? <h2>Loading</h2> : 
        <div className={!player1Turn ? "cards disabled" : "cards"}>
        {player1Cards.map((card, i) => (
            <div onClick={() => selectCard(card.id)} key={i} className={!player1Turn ? "card player1Card not-allowed" : 'card player1Card'}>
                    <div className='nmb-wrapper'>
                    <p className='nmb nmb-top'>{card.top}</p>
                    <p className='nmb nmb-left'>{card.left}</p>
                    <p className='nmb nmb-right'>{card.right}</p>
                    <p className='nmb nmb-bottom'>{card.bottom}</p>
                    </div>
                {card.img && <img className="card-img" src={card.img} alt={card.name} />}
            </div>
        ))}
        </div>}
    </div>
  )
}
