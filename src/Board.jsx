import { Square, Pawn, Queen, King, Rook, Bishop, Knight } from "./Classes"

const Board = () => {
    const test = new Queen('white')

    return (
        <>
            <div>
                <img src={test.get_image()}/>
            </div>
        </>
    )
}

export default Board