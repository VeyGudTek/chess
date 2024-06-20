import { useState } from "react"
import Chess from "./Chess"
import Board from "./Board"

const Local = () => {
    var chess = new Chess()
    const [selected, setSelected] = useState(null)
    
    const handleClick = (coordinates, piece) => {
        console.log('coords: ' + coordinates)
        if (piece){
            console.log('piece: ' + piece.name)
            console.log('moves: ' + piece.get_moves())
            setSelected(piece)
        }else{
            setSelected(null)
        }
    }

    return (
        <>
            <Board chess={chess} handleClick={handleClick} selected={selected} />
        </>
    )
}

export default Local