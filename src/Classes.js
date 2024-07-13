import blackSquare from './assets/black.png'
import whiteSquare from './assets/white.png'
import whiteKnight from './assets/whiteKnight.png'
import whiteBishop from './assets/whiteBishop.png'
import whiteKing from './assets/whiteKing.png'
import whiteQueen from './assets/whiteQueen.png'
import whiteRook from './assets/whiteRook.png'
import whitePawn from './assets/whitePawn.png'
import blackKing from './assets/blackKing.png'
import blackQueen from './assets/blackQueen.png'
import blackPawn from './assets/blackPawn.png'
import blackRook from './assets/blackRook.png'
import blackBishop from './assets/blackBishop.png'
import blackKnight from './assets/blackKnight.png'

export class Square{
    constructor(color) {
        this.color = color
        this.piece = null
    }

    get_image(){
        if (this.color === 'black'){
            return blackSquare
        }else{
            return whiteSquare
        }
    }
}

export class Piece{
    constructor(color, coordinates, game, name){
        this.color = color
        this.name = name
        this.coordinates = coordinates
        this.game = game
        this.images = {
            'black': {
                'pawn': blackPawn,
                'king': blackKing,
                'queen': blackQueen,
                'rook': blackRook,
                'bishop': blackBishop,
                'knight': blackKnight
            },
            'white': {
                'pawn': whitePawn,
                'king': whiteKing,
                'queen': whiteQueen,
                'rook': whiteRook,
                'bishop': whiteBishop,
                'knight': whiteKnight
            }
        }
    }

    get_image(){
        return this.images[this.color][this.name]
    }

    filter_forks(moves){
        var valid_moves = []
        var original_coordinates = this.coordinates

        moves.forEach((move) => {
            this.game.board[original_coordinates[0]][original_coordinates[1]].piece = null
            var old_piece = this.game.board[move[0]][move[1]].piece
            this.game.board[move[0]][move[1]].piece = this
            this.coordinates = move

            if (!this.game.check_check()){
                valid_moves.push(move)
            }

            this.game.board[original_coordinates[0]][original_coordinates[1]].piece = this
            this.game.board[move[0]][move[1]].piece = old_piece
            this.coordinates = original_coordinates
        })

        return valid_moves
    }

    check_in_bounds(x_offset, y_offset){
        if (this.coordinates[1] + x_offset > 7 || this.coordinates[1] + x_offset < 0){
            return false
        }
        if (this.coordinates[0] + y_offset > 7 || this.coordinates[0] + y_offset < 0){
            return false
        }
        return true
    }

    add_direction(moves, x_offset, y_offset, recursive=false, base_x_offset=0, base_y_offset=0){
        if (!this.check_in_bounds(x_offset + base_x_offset, y_offset + base_y_offset)){
            return 
        }

        if (this.game.board[this.coordinates[0] + y_offset + base_y_offset][this.coordinates[1] + x_offset + base_x_offset].piece === null){
            moves.push([this.coordinates[0] + y_offset + base_y_offset, this.coordinates[1] + x_offset + base_x_offset])
        }else if (this.game.board[this.coordinates[0] + y_offset + base_y_offset][this.coordinates[1] + x_offset + base_x_offset].piece.color !== this.color) {
            moves.push([this.coordinates[0] + y_offset + base_y_offset, this.coordinates[1] + x_offset + base_x_offset])
            return
        }else{
            return
        }

        if (recursive){
            this.add_direction(moves, x_offset, y_offset, true, base_x_offset + x_offset, base_y_offset + y_offset)
        }
    }
}

export class Pawn extends Piece{
    constructor(color, coordinates, game){
        super(color, coordinates, game, 'pawn')
        this.start = true
    }

    get_moves(check_next=true){
        var moves = []

        var increment = this.color === 'black' ? 1 : -1

        if (!this.check_in_bounds(0, increment)){
            return moves
        }

        //Check forward Move
        if (this.game.board[this.coordinates[0] + increment][this.coordinates[1]].piece === null){
            moves.push([this.coordinates[0] + increment, this.coordinates[1]])

            if (this.start && this.check_in_bounds(0, increment * 2) && this.game.board[this.coordinates[0] + increment * 2][this.coordinates[1]].piece === null){
                moves.push([this.coordinates[0] + increment * 2, this.coordinates[1]])
            }
        }

        //Check Attack Move
        if ((this.check_in_bounds(1, increment)) && (this.game.board[this.coordinates[0] + increment][this.coordinates[1] + 1].piece) && (this.game.board[this.coordinates[0] + increment][this.coordinates[1] + 1].piece.color != this.color)){
            moves.push([this.coordinates[0] + increment, this.coordinates[1] + 1])
        }
        if ((this.check_in_bounds(-1, increment)) && (this.game.board[this.coordinates[0] + increment][this.coordinates[1] - 1].piece) && (this.game.board[this.coordinates[0] + increment][this.coordinates[1] - 1].piece.color != this.color)){
            moves.push([this.coordinates[0] + increment, this.coordinates[1] - 1])
        }

        if(check_next){
            moves = this.filter_forks(moves)
        }

        return moves
    }
}

export class Knight extends Piece{
    constructor(color, coordinates, game){
        super(color, coordinates, game, 'knight')
    }

    get_moves(check_next=true){
        var moves = []

        this.add_direction(moves, 1, 2)
        this.add_direction(moves, 2, 1)
        this.add_direction(moves, -1, 2)
        this.add_direction(moves, -2, 1)
        this.add_direction(moves, 1, -2)
        this.add_direction(moves, 2, -1)
        this.add_direction(moves, -1, -2)
        this.add_direction(moves, -2, -1)

        if(check_next){
            moves = this.filter_forks(moves)
        }

        return moves
    }
}

export class King extends Piece{
    constructor(color, coordinates, game){
        super(color, coordinates, game, 'king')
    }

    get_moves(check_next=true){
        var moves = []

        this.add_direction(moves, 0, 1)
        this.add_direction(moves, 1, 1)
        this.add_direction(moves, 1, 0)
        this.add_direction(moves, 1, -1)
        this.add_direction(moves, 0, -1)
        this.add_direction(moves, -1, -1)
        this.add_direction(moves, -1, 0)
        this.add_direction(moves, -1, 1)

        if(check_next){
            moves = this.filter_forks(moves)
        }

        return moves
    }
}

export class Bishop extends Piece{
    constructor(color, coordinates, game){
        super(color, coordinates, game, 'bishop')
    }

    get_moves(check_next=true){
        var moves = []

        this.add_direction(moves, 1, 1, true)
        this.add_direction(moves, -1, 1, true)
        this.add_direction(moves, 1, -1, true)
        this.add_direction(moves, -1, -1, true)

        if(check_next){
            moves = this.filter_forks(moves)
        }

        return moves
    }
}

export class Rook extends Piece{
    constructor(color, coordinates, game){
        super(color, coordinates, game, 'rook')
    }

    get_moves(check_next=true){
        var moves = []

        this.add_direction(moves, 0, 1, true)
        this.add_direction(moves, 0, -1, true)
        this.add_direction(moves, -1, 0, true)
        this.add_direction(moves, 1, 0, true)

        if(check_next){
            moves = this.filter_forks(moves)
        }

        return moves
    }
}

export class Queen extends Piece{
    constructor(color, coordinates, game){
        super(color, coordinates, game, 'queen')
    }

    get_moves(check_next=true){
        var moves = []

        this.add_direction(moves, 0, 1, true)
        this.add_direction(moves, 0, -1, true)
        this.add_direction(moves, -1, 0, true)
        this.add_direction(moves, 1, 0, true)
        this.add_direction(moves, 1, 1, true)
        this.add_direction(moves, -1, 1, true)
        this.add_direction(moves, 1, -1, true)
        this.add_direction(moves, -1, -1, true)

        if(check_next){
            moves = this.filter_forks(moves)
        }

        return moves
    }
}