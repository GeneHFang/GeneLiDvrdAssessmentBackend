const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Board = new Schema({
    board:{ type: String },
});

module.exports = mongoose.model('Board', Board);