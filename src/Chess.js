import { Square, Pawn, Queen, King, Rook, Bishop, Knight } from "./Classes"

export default class Chess{
    constructor(){
        this.board = this.create_board()
    }

    create_board(){
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
            board[1][i].piece = new Pawn('black', [1, i], this)
            board[6][i].piece = new Pawn('white', [6, i], this)
        }

        board[0][0].piece = new Rook('black', [0, 0], this)
        board[0][7].piece = new Rook('black', [0, 7], this)
        board[7][0].piece = new Rook('white', [7, 0], this)
        board[7][7].piece = new Rook('white', [7, 7], this)

        board[0][1].piece = new Knight('black', [0, 1], this)
        board[0][6].piece = new Knight('black', [0, 6], this)
        board[7][1].piece = new Knight('white', [7, 1], this)
        board[7][6].piece = new Knight('white', [7, 6], this)

        board[0][2].piece = new Bishop('black', [0, 2], this)
        board[0][5].piece = new Bishop('black', [0, 5], this)
        board[7][2].piece = new Bishop('white', [7, 2], this)
        board[7][5].piece = new Bishop('white', [7, 5], this)
        
        board[0][3].piece = new King('black', [0, 3], this)
        board[0][4].piece = new Queen('black', [0, 4], this)
        board[7][3].piece = new King('white', [7, 3], this)
        board[7][4].piece = new Queen('white', [7, 4], this)


        return board
    }

    move_piece(origin, destination){
        this.board[destination[0]][destination[1]].piece = this.board[origin[0]][origin[1]].piece
        this.board[destination[0]][destination[1]].piece.coordinates = [destination[0], destination[1]]
        this.board[origin[0]][origin[1]].piece = null
    }
}