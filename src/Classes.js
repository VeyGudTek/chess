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
}

export class Pawn extends Piece{
    constructor(color, coordinates, game){
        super(color, coordinates, game, 'pawn')
        this.start = true
    }
}

export class Knight extends Piece{
    constructor(color, coordinates, game){
        super(color, coordinates, game, 'knight')
    }
}

export class King extends Piece{
    constructor(color, coordinates, game){
        super(color, coordinates, game, 'king')
    }
}

export class Bishop extends Piece{
    constructor(color, coordinates, game){
        super(color, coordinates, game, 'bishop')
    }
}

export class Rook extends Piece{
    constructor(color, coordinates, game){
        super(color, coordinates, game, 'rook')
    }
}

export class Queen extends Piece{
    constructor(color, coordinates, game){
        super(color, coordinates, game, 'queen')
    }
}