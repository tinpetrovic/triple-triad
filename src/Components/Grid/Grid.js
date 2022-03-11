import React, {useState, useEffect, useContext} from 'react'
import data from "../../Data/grid.json"
import "./grid.scss"
import {GameContext} from "../../Context/GameContext"

export default function Grid({loading, setLoading, getPlayer1Cards, getPlayer2Cards, player1Cards, setPlayer1Cards, player2Cards, setPlayer2Cards, setScore1, setScore2, score1, score2}) {
  const [selectedCard, setSelectedCard, player1Turn, setPlayer1Turn] = useContext(GameContext)
  const [grid, setGrid] = useState([])

  const checkScore = () => {
    let sc1 = 0
    let sc2 = 0
    for (let i=0; i<grid.length; i++) {
      if(grid[i].player1) {
        sc1++
      } else if (grid[i].player1 !== "" && grid[i].player1 === false) {
        console.log(grid[i])
        sc2++
      }
    }
    setScore1(sc1)
    setScore2(sc2)
  }

  const checkWin = () => {
    if(player1Cards.length == 0 || player2Cards.length == 0) {}
  }
  
  const checkValuesTop = (grido, top) => {
    if(selectedCard.player1 !== top.player1 && selectedCard.top > top.bottom) {
      setGrid(grido.map(gr => gr.id === top.id ? {...gr, player1:!gr.player1} : gr))
    }
  }

  const checkValuesAfter = (grido, after) => {
    if(selectedCard.player1 !== after.player1 && selectedCard.right > after.left) {
      setGrid(grido.map(gr => gr.id === after.id ? {...gr, player1:!gr.player1} : gr))
    }
  }

  const checkValuesBottom = (grido, bottom) => {
    if(selectedCard.player1 !== bottom.player1 && selectedCard.bottom > bottom.top) {
      setGrid(grido.map(gr => gr.id === bottom.id ? {...gr, player1:!gr.player1} : gr))
    }
  }

  const checkValuesBefore = (grido, before) => {
    if(selectedCard.player1 !== before.player1 && selectedCard.left > before.right) {
      setGrid(grido.map(gr => gr.id === before.id ? {...gr, player1:!gr.player1} : gr))
    }
  }
  
  const checkCard = (place, grid) => {
    const top = grid.find(gr => gr.id+3 == place.id)
    const after = grid.find(gr => gr.id-1 == place.id)
    const bottom = grid.find(gr => gr.id-3 == place.id)
    const before = grid.find(gr => gr.id+1 == place.id)
    
      if(top && top.name !== "" ) {
      checkValuesTop(grid,top)
    } if(after && after.id !== 4 && after.id !== 7 && after.name !== "" ) {
      checkValuesAfter(grid,after)
    } if(bottom && bottom.name !== "" ) {
      checkValuesBottom(grid,bottom)
    } if(before && before.id !== 3 && before.id !== 6 && before.name !== "" ) {
      checkValuesBefore(grid,before)
    } else return
  }


  const placeCard = (field) => {
    let newGrid = []
    if(field.name === "") {
     newGrid = grid.map(gr => gr.id === field.id ? 
        {id: field.id, 
        name: selectedCard.name, 
        top: selectedCard.top,
        right: selectedCard.right,
        bottom: selectedCard.bottom,
        left: selectedCard.left,
        img: selectedCard.img,
        player1: selectedCard.player1
        } : gr)
      setGrid(newGrid)
      checkCard(field, newGrid)
      setSelectedCard()
      setPlayer1Turn(!player1Turn)
      } else return

      if (player1Turn) {
        let newCards = player1Cards.filter(card => card.id !== selectedCard.id)
        setPlayer1Cards(newCards)
      } else if (!player1Turn) {
        let newCards = player2Cards.filter(card => card.id !== selectedCard.id)
        setPlayer2Cards(newCards)
      }
  }

  const restart = () => {
    setPlayer1Cards([])
    setPlayer2Cards([])
    setScore1(0)
    setScore2(0)
    setSelectedCard()
    getPlayer1Cards()
    getPlayer2Cards()
    setGrid(data.grid)
    setPlayer1Turn(true)
  }

useEffect(() => {
  setLoading(true)
  console.log(loading)
  setGrid(data.grid)
  setLoading(false)
  console.log(loading)
}, [])


useEffect(() => {
  checkScore()
  checkWin()
}, [grid])
  
  return (
    <div className='container'>
            <div className={!loading && player1Cards.length == 0 && score1>0 || score2>0 || !loading && player2Cards.length == 0 && score1>0 || score2>0 ? "modal modal-win" : "modal"}>
                  <div className='modal-info'>
                    {score1 > score2 && <h2>🎉 Player 1 Wins! 🎉</h2>}
                    {score2 > score1 && <h2>🎉 Player 2 Wins! 🎉</h2>}
                    {score2>0 && score1>0 && score1===score2 && <h2>Draw</h2>}
                  <button className='btn btn-primary' onClick={restart}>Play Again!</button>
                </div>
              </div>
      <div className='grid-container'>
          {grid.map(((place, i) => (
            <div key={i} className={place.player1 === true ? "player1 grid-place" : place.player1 === false ? "player2 grid-place" : place.player1 === "" ? "grid-place" : selectedCard ? 'grid-place active' : 'grid-place'} onClick={() => placeCard(place)}>
                      <div className='nmb-wrapper'>
                        <p className='nmb nmb-top'>{place.top}</p>
                        <p className='nmb nmb-left'>{place.left}</p>
                        <p className='nmb nmb-right'>{place.right}</p>
                        <p className='nmb nmb-bottom'>{place.bottom}</p>
                      </div>
                  {place.img && <img src={place.img} alt={place.name} />}
            </div>
          )))}
      </div>
      <div className='score-wrapp'>
        <h5>Player 1 Score: <span>{score1}</span></h5>
        <h5>Player 2 Score: <span>{score2}</span></h5>
      </div>
    </div>

  )
}
