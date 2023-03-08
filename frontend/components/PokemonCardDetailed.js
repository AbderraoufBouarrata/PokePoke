import React from 'react'

export default function PokemonCardDetailed({ pokemon }) {
    console.log(pokemon.data)
    const { id, name, sprites, abilities, types, height, weight, stats } = pokemon.data

    return (
        <>
            <style>
                {`
                    .stats{
                        display: grid;
                        grid-template-columns: 2fr 3fr;
                        // grid-template-rows: repeat(6, 1fr);
                        gap: 2rem;
                        align-items: center;
                    }
                    .layout-edit {
                        grid-template-rows: auto auto auto;
                    }
                `}
            </style>
            <div className='flex justify-center items-center lg:m-8 md:m-4 m-1 sm:h-96 '>
                <div className="grid sm:grid-cols-3 max-sm:grid-rows-3 max-sm:layout-edit md:m-8 md:w-10/12 w-full h-fit m-1 bg-white border border-gray-200 rounded-lg shadow ease-out duration-300 dark:bg-gray-800 dark:border-gray-700">
                    <div className='stats '>
                        <div className='flex items-end flex-col'>
                            <h3 className='text-xl font-bold text-gray-800 dark:text-white'>ID</h3>
                            <h3 className='text-xl font-bold text-gray-800 dark:text-white'>Height</h3>
                            <h3 className='text-xl font-bold text-gray-800 dark:text-white'>Weight</h3>
                            <h3 className='text-xl font-bold text-gray-800 dark:text-white'>Abilities</h3>
                            <h3 className='text-xl font-bold text-gray-800 dark:text-white'>Type</h3>
                            <h3 className='text-xl font-bold text-gray-800 dark:text-white'>Forms</h3>
                        </div>
                        <div >
                            <h3 className='text-xl text-gray-700 dark:text-gray-400'>{id}</h3>
                            <h3 className='text-xl text-gray-700 dark:text-gray-400'>{(height * 0.1).toFixed(1)} M</h3>
                            <h3 className='text-xl text-gray-700 dark:text-gray-400'>{(weight * 0.1).toFixed(1)} KG</h3>
                            <h3 className='text-xl text-gray-700 dark:text-gray-400'>{abilities[0]?.ability.name} & {pokemon.data.abilities[1]?.ability.name}</h3>
                            <h3 className='text-xl text-gray-700 dark:text-gray-400'>{types[0].type.name} {types[1]?.type.name}</h3>
                            <h3 className='text-xl text-gray-700 dark:text-gray-400'>
                                {
                                    pokemon.data.forms?.map((form) => {
                                        return (`${form.name} `)
                                    })
                                }
                            </h3>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{name}</h1>
                        </div>
                        <div className="sm:w-72 sm:h-72 h-72 w-72">
                            <img src={sprites.front_default} alt="Pokemon" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className='m-4'>
                        <h3 className='text-xl font-bold text-gray-800 dark:text-white'>Base Stats:</h3>
                        {
                            stats.map((stat, index) => {
                                return (
                                    <div className='my-2'>
                                        <div className='font-bold text-gray-800 dark:text-white'>{stats[index].stat.name}</div>
                                        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${(stats[index].base_stat * 100) / 255}%` }}> {stats[index].base_stat}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
