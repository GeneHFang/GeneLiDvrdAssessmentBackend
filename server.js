const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

//ROUTER SETUP
const boardRoute = express.Router();
let Board = require('./board.model');

//DB CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/board', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established");
});

//GET BOARD
boardRoute.route('/').get((request, response) => {
    Board.find((error, board) => {
        if (error) { response.status(400).send("Error getting board") }
        else {
            response.json(board);
        }
    });
});

//SET BOARD
boardRoute.route('/set').post(async (request, response) => {
    //UPDATE BOARD IF EXISTS
    let exists = await Board.find();
    if (exists[0]){
        exists[0].board = request.body.board;
        exists[0].gridNum = request.body.gridNum;
        exists[0].topColor = request.body.topColor;
        exists[0].topShape = request.body.topShape;
        exists[0].bottomColor = request.body.bottomColor;
        exists[0].bottomShape = request.body.bottomShape;
        exists[0].clicked = request.body.clicked;
        exists[0].turn = request.body.turn;
        exists[0].hilightedPiece = request.body.hilightedPiece;
        exists[0].save()
            .then(board => {
                response.status(200).json({'board': 'board saved successfully'});
            })
            .catch(error => {
                console.log(error)
                response.status(400).send('board not saved');
            })
    }
    //CREATE NEW BOARD IF NO BOARD EXISTS
    else{
        let board = new Board(request.body);
        board.save()
        .then(board => {
            response.status(200).json({'board': 'board set successfully'});
        })
        .catch(error => {
            response.status(400).send('board not set');
        });
    }
});

//RESET BOARD (DELETE FROM DB)
boardRoute.route('/reset').delete(async (request, response) => {
    let board = await Board.find();
    board[0].remove()
        .then( board => {
            response.status(200).json({"message":"removed"})
        })
        .catch( error => {
            response.status(400).send("error, board not removed")
        })
});

//BASE ROUTE
app.use('/board', boardRoute);

//MAIN
app.listen(PORT, () => {
    console.log("Server is running on port "+PORT);
});

