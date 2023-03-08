import React from 'react'
import PokemonCardDetailed from '../../components/PokemonCardDetailed'

export default function Pokemon({ pokemon }) {
    return (
        <>
            <PokemonCardDetailed pokemon={pokemon} />
            <div className='flex justify-center items-center'>
                <button onClick={() => null} type='button' className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Load Evolutions</button>
            </div>
        </>
    )
}

export async function getServerSideProps({ query }) {
    const API = 'http://localhost:4000/api/v1/pokemon/'
    const pokemon = await fetch(`${API}${query.pokemon}`).then((res) => res.json());
    return {
        props: { pokemon }
    };
}