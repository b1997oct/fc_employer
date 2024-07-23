'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Back() {
    const r = useRouter()
    return <button onClick={r.back} className='text-red-600 hover:bg-red-100 px-2 pb-1 text-sm font-normal df aic'>BACK</button>
}
