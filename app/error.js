'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}) {
console.log({reset});
    return (
        <div>
            <p>{error.message}</p>
            <h2>Something went wrong!</h2>
            <button onClick={()=>reset()}>
                Try again
            </button>
        </div>
    )
}