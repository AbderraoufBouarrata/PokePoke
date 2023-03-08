import Link from 'next/link'
import PokemonCard from '../components/PokemonCard'
import LoadingButton from '../components/LoadingButton'
import { useState, useEffect, useMemo } from 'react'
import SearchParameters from '../components/SearchParameters'

export default function Home() {

  const [details, setDetails] = useState({});
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    let url = "http://localhost:4000/api/v1/pokemons"
    let queryString = "?offset=0&limit=20"
    const fetchPokemon = async () => {
      setIsLoading(true);

      const data = await fetch(`${url}${queryString}`).then((res) => res.json());
      let temp = data.data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url).then((res) => res.json());
        return res;
      })

      queryString = '?' + data.next.split('?')[1]

      setDetails(await Promise.all(temp))
      setNextPageUrl(`${url}${queryString}`);
      setIsLoading(false);
    };
    fetchPokemon();
    window.addEventListener('scroll', checkScrollTop);
  }, []);

  async function loadMore() {
    setIsMoreLoading(true);

    const data = await fetch(nextPageUrl,).then(res => res.json());
    let queryString = '?' + data.next.split('?')[1]
    let temp = data.data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url).then((res) => res.json());
      return res;
    })

    setDetails([...details, ...await Promise.all(temp)])
    setNextPageUrl(`${nextPageUrl.split('?')[0]}${queryString}`);
    setIsMoreLoading(false);
  };

  function scrollToTop() {
    // scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  function checkScrollTop() {
    if (!showScrollButton && window.pageYOffset > 400) {
      setShowScrollButton(true)
    } else if (showScrollButton && window.pageYOffset <= 400) {
      setShowScrollButton(false)
    }
  }

  return (
    <>
      <SearchParameters />
      {isLoading ? (
        <div className='my-8 flex justify-center items-center'><LoadingButton /></div>
      ) : (
        <>
          
          <div className="flex flex-row flex-wrap justify-center items-center">
            {details.map((detail, index) => {
              return (
                <PokemonCard key={index} pokemon={detail} />
              );
            })}
          </div>
          {
            isMoreLoading ? <div className='my-8 flex justify-center items-center'><LoadingButton /></div>
              :
              <>
                <div className='my-8 flex justify-center items-center'>
                  <button onClick={() => loadMore()} type='button' className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Load More</button>
                </div>
                <div className={`${showScrollButton ? 'fixed' : 'hidden'} bottom-24 right-4 ease-out duration-300`}>
                  <button onClick={() => scrollToTop()} type='button' className="h-16 w-16  focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>
                  </button>
                </div>
              </>
          }
        </>
      )}
    </>
  )
}
