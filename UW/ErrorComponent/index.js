import React from 'react'

export default function ErrorComponent({ message }) {
    return (
        <div>
            <h3>Something went wrong!</h3>
            <p className="ce">{message}</p>
        </div>
    )
}
