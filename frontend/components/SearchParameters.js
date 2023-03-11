import PreviousMap from 'postcss/lib/previous-map'
import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce'

export default function SearchParameters(props) {
    const { details, setDetails } = props
    const detailsCopy = details
    const [showSortDropdown, setShowSortDropdown] = useState(false)
    const [showTypeDropdown, setShowTypeDropdown] = useState(false)
    const [showRegionDropdown, setShowRegionDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const debouncedValue = useDebounce(inputValue, 1000);
    const types = ['normal', 'fire', 'water', 'grass', 'electric', 'ice',
        'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock',
        'ghost', 'dragon', 'dark', 'steel', 'fairy']

    function handleSearchChange(event) {
        setIsLoading(true)
        if (!event.target.value==='') return setIsLoading(false)
        setInputValue(event.target.value);
    };

    // Use the debounced value in your component logic
    useEffect(() => {
        if (!inputValue) return setIsLoading(false)
        async function fetchData() {
            let temp = {}
            console.log("Debounced value:", debouncedValue);
            let data = fetch(`http://localhost:4000/api/v1/pokemons?limit=10000&offset=0`).then(res => res.json()).then(async (data) => {
                temp = data.data.results.filter(pokemon => pokemon.name.includes(debouncedValue))
                temp = await Promise.all(temp.map(async (pokemon) => {
                    const res = await fetch(pokemon.url).then((res) => res.json());
                    return res;
                }))
                setDetails(temp)
            })
            console.log("fetched all pokemons")
        }

        fetchData()
        setIsLoading(false)
    }, [debouncedValue]);

    function handleSortChange(event) {
        setIsLoading(true)
        if (event.target.value === 'id') {
            let temp = [...details].sort((a, b) => a.id - b.id)
            setDetails(temp)
        } else if (event.target.value === 'name') {
            let temp = [...details].sort((a, b) => a.name.localeCompare(b.name))
            console.log("sorted by name", temp)
            setDetails(temp)
        } else if (event.target.value === 'weight') {
            let temp = [...details].sort((a, b) => a.weight - b.weight)
            setDetails(temp)
        } else if (event.target.value === 'height') {
            let temp = [...details].sort((a, b) => a.height - b.height)
            setDetails(temp)
        }
        setIsLoading(false)
    }

    function handleTypeChange(event) {
        if (event.target.textContent === 'All') {
            return
        } else {
            setDetails(detailsCopy.filter(pokemon => pokemon.types.includes(event.target.textContent)))
        }
    }

    function handleRegionChange(event) {
        setIsLoading(true)
        let data = fetch(`http://localhost:4000/api/v1/pokemons?limit=10000&offset=0`).then(res => res.json())
        console.log(data)
        if (event.target.textContent === 'All') {
            return
        } else {
            setDetails(detailsCopy.filter(pokemon => pokemon.region.includes(event.target.textContent)))
        }
        setIsLoading(false)
    }
    return (
        <form className='flex md:flex-row md:gap-16 md:justify-center md:m-8 m-4 gap-4 flex-col items-center'>
            <div className='w-40'>
                <select onChange={(e) => handleSortChange(e)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue>Sort By </option>
                    <option value="name">Name</option>
                    <option value="id">ID</option>
                    <option value="weight">Weight</option>
                    <option value="height">Height</option>
                </select>

            </div>
            <div className='w-40'>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue>Filter: Type</option>
                    {
                        types.map((type, index) => {
                            return <option key={index} value={type}>{type}</option>
                        })
                    }
                </select>

            </div>
            <div className='w-40'>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue>Filter: Region</option>

                </select>

            </div>
            <div className="flex w-96">

                <div className="relative w-full">
                    <input onChange={handleSearchChange} type="search" id="search-dropdown" className="block p-2.5 md:w-96 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Pokemon By Name" />
                    <button onClick={() => handleSearchChange()} className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {
                            isLoading ?
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                </svg>
                                :
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        }
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    )
}
