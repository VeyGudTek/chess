import { useState } from "react"
import Chess from "./Chess"
import Board from "./Board"

const Local = () => {
    const [chess, setChess] = useState(new Chess())
    const [selected, setSelected] = useState(null)
    
    const coordIn = (set, target) => {
        for (let i = 0; i < set.length; i++){
            if (set[i][0] === target[0] && set[i][1] === target[1]){
                return true
            }
        }
        return false
    }

    const handleClick = (coordinates, piece=null) => {
        if (selected && coordIn(selected.get_moves(), coordinates)){
            console.log('move piece')
            chess.move_piece(selected.coordinates, coordinates)
            setChess(chess)
            setSelected(null)
        }else if(selected){
            console.log('invalid moves')
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