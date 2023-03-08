const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

//import all the routes 
const pokemons = require('./routes/pokemon');

app.use('/api/v1', cors(), pokemons);

//middleware to handle errors

module.exports = app;