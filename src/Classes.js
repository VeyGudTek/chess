import blackSquare from './assets/black.png'
import whiteSquare from './assets/white.png'

export class Square{
    constructor(color) {
        this.color = color
        this.piece = null
    }

    get image(){
        if (this.color === 'black'){
            return blackSquare
        }else{
            return whiteSquare
        }
    }
}

export class Piece{
    constructor(color, coordinates, game){
        this.color = color
        this.coordinates = coordinates
        this.game = game
    }
}

export class Pawn extends Piece{
    constructor(color, coordinates, game){
        super(color, coordinates, game)
        this.start = true
    }
}

export class Knight extends Piece{

}

export class King extends Piece{
    
}

export class Bishop extends Piece{
    
}

export class Rook extends Piece{
    
}

export class Queen extends Piece{
    
}