import React from 'react'

export default function Menu({ active, children }) {
    return (
        <div className='df gap p bg border-b'><input type='radio' checked={active} /> {children}</div>
    )
}
