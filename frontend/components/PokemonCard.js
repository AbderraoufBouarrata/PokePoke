import React from 'react'
import Link from 'next/link'

import { useState } from 'react'

export default function PokemonCard({ pokemon }) {
    const { name, types, sprites } = pokemon;

    function buttonColorPicker(type) {
        const types = ('normal', 'fire', 'water', 'grass', 'electric', 'ice',
            'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock',
            'ghost', 'dragon', 'dark', 'steel', 'fairy')

        switch (type) {
            case 'fire':
                return 'from-red-400 via-red-500 to-red-600';
            case 'water':
                return 'from-blue-400 via-blue-500 to-blue-600';
            case 'grass':
                return 'from-green-400 via-green-500 to-green-600';
            case 'electric':
                return 'from-yellow-400 via-yellow-500 to-yellow-600';
            case 'psychic':
                return 'from-purple-400 via-purple-500 to-purple-600';
            case 'rock':
                return 'from-gray-400 via-gray-500 to-gray-600';
            case 'ghost':
                return 'from-indigo-400 via-indigo-500 to-indigo-600';
            case 'dragon':
                return 'from-red-500 via-pink-500 to-purple-500';
            case 'dark':
                return 'from-gray-600 via-gray-700 to-gray-800';
            case 'steel':
                return 'from-gray-300 via-gray-400 to-gray-500';
            case 'fairy':
                return 'from-pink-400 via-pink-500 to-pink-600';
            case 'ice':
                return 'from-blue-300 via-blue-400 to-blue-500';
            case 'ground':
                return 'from-yellow-600 via-yellow-700 to-yellow-800';
            case 'flying':
                return 'from-blue-200 via-blue-300 to-blue-400';
            case 'fighting':
                return 'from-red-700 via-red-800 to-red-900';
            case 'poison':
                return 'from-purple-500 via-purple-600 to-purple-700';
            default:
                return 'from-gray-500 via-gray-600 to-gray-700';
        }
    }

    return (
        <>
            <div className="max-w-sm w-72 m-5 h-96 bg-white border border-gray-200 rounded-lg shadow ease-out duration-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-800 dark:border-gray-700">
                <Link href={`pokemon/${pokemon.name}`}>
                    <div className='h-40 w-full overflow-hidden flex justify-center items-center'>
                        <img className="rounded-t-lg h-h-40 w-40" src={sprites.front_default} alt="" />
                    </div>
                </Link>
                <div className="p-5">
                    <Link href={`pokemon/${pokemon.name}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 h-12 overflow-clip ">{name} is a pokemon of type: </p>
                </div>
                    <div className='flex px-5  justify-start items-end'>
                        <button className={`text-white bg-gradient-to-r ${buttonColorPicker(types[0]?.type.name)} font-bold rounded-full text-base px-5 py-2.5 text-center mr-2 mb-2`}>
                            {types[0]?.type.name}
                        </button>
                        {
                            types[1]?.type.name ?
                                <button className={`text-white bg-gradient-to-r ${buttonColorPicker(types[1]?.type.name)} font-bold rounded-full text-base px-5 py-2.5 text-center mr-2 mb-2`}>
                                    {types[1]?.type.name}
                                </button>
                                :
                                null
                        }
                    </div>
            </div>
        </>
    )
}
