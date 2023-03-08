import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
export default function Layout({ children }) {
    return (
        <>
            <style>
                {`
                    .layout {
                        min-height: 100vh;
                        min-height: 100dvh;
                        display: grid;
                        grid-template-rows: auto 1fr auto;
                        grid-template-columns: 100%;
                      }
                `}
            </style>
            <div className='layout'>
                <NavBar />
                <main>{children}</main>
                <Footer />
            </div>
        </>
    )
}
