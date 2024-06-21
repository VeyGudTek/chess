import { useState } from "react"
import Chess from "./Chess"
import Board from "./Board"

const Local = () => {
    const [chess, setChess] = useState(new Chess())
    const [selected, setSelected] = useState(null)

    const handleClick = (coordinates, piece=null) => {
        if (selected && chess.coordIn(selected.get_moves(), coordinates)){
            console.log('move piece')
            chess.move_piece(selected.coordinates, coordinates)
            setChess(chess)
            setSelected(null)
        }else if(selected){
            console.log('invalid moves')
            setSelected(null)
        }else if (piece && piece.color !== chess.turn){
            console.log('not ' + piece.color + "'s turn")
            setSelected(null)
        }else if (piece){
            console.log('new piece selected')
            setSelected(piece)
        }
        else{
            console.log('nothing')
        }
    }

    return (
        <>
            <Board chess={chess} handleClick={handleClick} selected={selected} />
        </>
    )
}

export default Local