import React from 'react'

export default function SpanInput({ span, ...props }) {

    return <div className='relative w-full'>
        {span}
        <input {...props} />
    </div>
}
