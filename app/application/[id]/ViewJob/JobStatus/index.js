import React from 'react'

export default function JobStatus({ active, status }) {
    return (
        <div>
            <div className='border px-2 pointer active:bg-red-50 select-none text-red-500'>
                {active ? 'Live' : 'Inactive'}
            </div>
        </div>
    )
}
