const express = require('express');
const router = express.Router();

const { getPokemons, getPokemonById } = require('../controllers/pokemon');

router.route('/pokemons').get(getPokemons);
router.route('/pokemon/:id').get(getPokemonById);

module.exports = router;