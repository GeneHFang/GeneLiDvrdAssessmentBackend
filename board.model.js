const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Board = new Schema({ 
    //STRING REPRESENTATION OF BOARD
    board:{ type: String },
    
    //GRID SIZE
    gridNum:{ type: Number },
    
    //TOP PLAYER ATTRIBUTES
    topColor: { type: String },
    topShape: { type: String },
    
    //BOTTOM PLAYER ATTRIBUTES
    bottomColor: { type: String },
    bottomShape: { type: String },
    
    //TURN LOGIC
    clicked:  { type: Boolean },
    turn: { type: String },

    //SAVED HILIGHTED PIECE OBJECT
    hilightedPiece:  {
        row:{
            type: Number},
        col:{
            type: Number},
        topOrBottom:{
            type: String
        }
    },
});

module.exports = mongoose.model('Board', Board);