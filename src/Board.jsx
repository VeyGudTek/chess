import hit from "./assets/hit.png"
import selected_png from "./assets/selected.png"
import './board.css'

const Board = ({chess, handleClick, selected}) => {
    const css_coord = (coord) => {
        if (chess.turn === "white"){
            return coord + 1
        }else{
            return 8 - coord
        }
    }

    return (
        <>
            <div className="chess-board">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
                    [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
                        <div className="square" style={{gridColumn: css_coord(col), gridRow: css_coord(row)}} key={'square' + row.toString() + col.toString()}>
                            <img src={chess.board[row][col].get_image()} onClick={() => {handleClick([row, col])}}/>
                        </div>
                    ))
                ))}

                {selected && <div className="square" style={{gridColumn: css_coord(selected.coordinates[1]), gridRow: css_coord(selected.coordinates[0])}}>
                    <img src={selected_png} onClick={() => {handleClick([selected.coordinates[0], selected.coordinates[1]])}}/>
                </div>}

                {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
                    [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
                        chess.board[row][col].piece !== null
                         ? (<div className="square" style={{gridColumn: css_coord(col), gridRow: css_coord(row)}} key={'piece' + row.toString() + col.toString()}>
                            <img src={chess.board[row][col].piece.get_image()} onClick={() => {handleClick([row, col], chess.board[row][col].piece)}}/>
                         </div>) 
                         : null
                    ))
                ))}

                {selected && selected.get_moves().map((coordinates) => (
                    <div className="square" style={{gridColumn: css_coord(coordinates[1]), gridRow: css_coord(coordinates[0])}} key={'move' + coordinates[0].toString() + coordinates[1].toString()}> 
                        <img src={hit} onClick={() => {handleClick([coordinates[0], coordinates[1]])}}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Board