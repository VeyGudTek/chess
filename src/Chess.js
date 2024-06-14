import { Square, Pawn, Queen, King, Rook, Bishop, Knight } from "./Classes"

export default class Chess{
    constructor(){
        this.board = this.createBoard()
    }

    createBoard(){
        var board = []
        
        for (let i = 0; i < 8; i++){
            board.push([])
            for (let j = 0; j < 8; j++){
                if ((i + j) % 2 === 0 ){
                    board[i].push(new Square('black'))
                }else{
                    board[i].push(new Square('white'))
                }
            }
        }

        for (let i = 0; i < 8; i++){
            board[1][i].piece = new Pawn('black'), [1, i], this
            board[6][i].piece = new Pawn('white'), [6, i], this
        }

        return board
    }
}