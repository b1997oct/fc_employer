import React from 'react'
import Header from '../Header'

export default function Layout({ active, children }) {
    return (
        <div className='bg-stone-50'>
            <Header active={active} />
            {children}
            <br/>
            <br/>
            <br/>
        </div>
    )
}
