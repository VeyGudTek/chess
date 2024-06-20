import hit from "./assets/hit.png"
import './board.css'

const Board = ({chess, handleClick, selected}) => {

    return (
        <>
            <div className="chess-board">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
                    [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
                        <div className="square" style={{gridColumn: col + 1, gridRow: row + 1}} key={'square' + row.toString() + col.toString()}>
                            <img src={chess.board[row][col].get_image()} onClick={() => {handleClick([row, col])}}/>
                        </div>
                    ))
                ))}

                {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
                    [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
                        chess.board[row][col].piece !== null
                         ? (<div className="square" style={{gridColumn: col + 1, gridRow: row + 1}} key={'piece' + row.toString() + col.toString()}>
                            <img src={chess.board[row][col].piece.get_image()} onClick={() => {handleClick([row, col], chess.board[row][col].piece)}}/>
                         </div>) 
                         : null
                    ))
                ))}

                {selected && selected.get_moves().map((coordinates) => (
                    <div className="square" style={{gridColumn: coordinates[1] + 1, gridRow: coordinates[0] + 1}} key={'move' + coordinates[0].toString() + coordinates[1].toString()}> 
                        <img src={hit} onClick={() => {handleClick([coordinates[0], coordinates[1]])}}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Board