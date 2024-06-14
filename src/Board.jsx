import Chess from "./Chess"
import './board.css'

const Board = () => {
    var chess = new Chess()
    
    const handleClick = () => {
        console.log('test')
    }

    return (
        <>
            <div className="chess-board">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
                    [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
                        <div className="square" style={{gridColumn: col + 1, gridRow: row + 1}} key={'square' + row.toString() + col.toString()}>
                            <img src={chess.board[row][col].get_image()} onClick={handleClick}/>
                        </div>
                    ))
                ))}

                {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
                    [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
                        chess.board[row][col].piece !== null
                         ? (<div className="square" style={{gridColumn: col + 1, gridRow: row + 1}} key={'piece' + row.toString() + col.toString()}>
                            <img src={chess.board[row][col].piece.get_image()} onClick={handleClick}/>
                         </div>) 
                         : null
                    ))
                ))}
            </div>
        </>
    )
}

export default Board