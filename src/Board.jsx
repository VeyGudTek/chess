import Chess from "./Chess"
import './board.css'

const Board = () => {
    var chess = new Chess()
    console.log(chess.board[2][4].get_image())

    return (
        <>
            <div className="chess-board">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
                    [0, 1, 2, 3, 4, 5, 6, 7].map((square) => (
                        <div className="square" style={{gridColumn: square + 1, gridRow: row + 1}} key={row.toString() + square.toString()}>
                            <img src={chess.board[row][square].get_image()} />
                        </div>
                    ))
                ))}
            </div>
        </>
    )
}

export default Board