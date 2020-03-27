const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;


app.use(cors());
app.use(bodyParser.json());

//DB CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/board', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established");
});

//MAIN
app.listen(PORT, () => {
    console.log("Server is running on port "+PORT);
});

