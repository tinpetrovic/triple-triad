import React, {createContext, useState} from 'react'


export const GameContext = createContext()

export default function GameProvider({children}) {
  const [player1Turn, setPlayer1Turn] = useState(true)
  const [selectedCard, setSelectedCard] = useState()

  
  console.log(selectedCard)
  return (
    <GameContext.Provider value={[selectedCard, setSelectedCard, player1Turn, setPlayer1Turn]}>
        {children}
    </GameContext.Provider>
  )
}
