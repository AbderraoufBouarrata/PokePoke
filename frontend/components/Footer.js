import React from 'react'
import Link from 'next/link'
export default function Footer() {
    return (
        <>
            <footer className="p-4 my-4 mx-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-900">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href="https://pokeapi.co/" className="hover:underline">Poke™</Link>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <Link href="#" className="mr-4 hover:underline md:mr-6 ">Favorites</Link>
                    </li>
                    <li>
                        <Link href="#" className="mr-4 hover:underline md:mr-6">About</Link>
                    </li>
                </ul>
            </footer>
        </>
    )
}
