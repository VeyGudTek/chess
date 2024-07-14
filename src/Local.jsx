import { useState } from "react"
import Chess from "./Chess"
import Board from "./Board"

import "./interface.css"

const Local = () => {
    const [chess, setChess] = useState(new Chess())
    const [selected, setSelected] = useState(null)

    const handleClick = (coordinates, piece=null) => {
        if (piece && piece.color !== chess.turn){
            console.log('not ' + piece.color + "'s turn")
            setSelected(null)
        }else if (piece){
            console.log('new piece selected')
            setSelected(piece)
        }else if (selected && chess.coordIn(selected.get_moves(), coordinates)){
            console.log('move piece')
            chess.move_piece(selected.coordinates, coordinates)
            setChess(chess)
            setSelected(null)
            console.log('in check?: ', chess.check_check())
        }else if(selected){
            console.log('invalid moves')
            setSelected(null)
        }else{
            console.log('nothing')
        }
    }

    return (
        <>
            <div className="interface">
                <div className="pawn-conversion">
                    <div className="pawn-option">
                        <img src={chess.kings['white'].images[chess.turn]['knight']}/>
                    </div>
                    <div className="pawn-option">
                        <img src={chess.kings['white'].images[chess.turn]['rook']}/>
                    </div>
                    <div className="pawn-option">
                        <img src={chess.kings['white'].images[chess.turn]['bishop']}/>
                    </div>
                    <div className="pawn-option">
                        <img src={chess.kings['white'].images[chess.turn]['queen']}/>
                    </div>
                </div>

                <Board chess={chess} handleClick={handleClick} selected={selected} />
            </div>
        </>
    )
}

export default Local