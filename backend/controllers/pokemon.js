const APIFeatures = require('../utils/apiFeatures');
// Get all pokemons - /api/v1/pokemons
exports.getPokemons = async (req, res, next) => {

    const limit = req.query.limit * 1 || 20;
    let offset = req.query.offset * 1 || 0;

    let allPokemons = await fetch(`${process.env.POKEAPI}/pokemon?offset=${offset}&limit=${limit}`)//.search().filter().pagination()
        .then(response => response.json()).catch(err => console.log(err))

    if (!allPokemons) {
        return res.status(404).json({
            success: false,
            message: 'Pokemons not found'
        })
    }

    res.status(200).json({
        succress: true,
        next: `${process.env.POKEAPI}/pokemon?offset=${offset + 20}&limit=${limit}`,
        count: allPokemons.count,
        data: allPokemons
    })
}

// Get single pokemon by id - /api/v1/pokemons/:id
exports.getPokemonById = async (req, res, next) => {
    let pokemon = await fetch(`${process.env.POKEAPI}/pokemon/${req.params.id}`, {
        //enable cors
        mode: 'cors',
        //allow cors
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(response => response.json())

    if (!pokemon) {
        return res.status(404).json({
            success: false,
            message: 'Pokemon not found'
        })
    }
    res.status(200).json({
        succress: true,
        data: pokemon
    })
}