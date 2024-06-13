import { Square } from "./Classes"

const Board = () => {
    const test = new Square('black')
    console.log(test.image)

    return (
        <>
            <div>
                <img src={test.image}/>
            </div>
        </>
    )
}

export default Board