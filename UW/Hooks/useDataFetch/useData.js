'use client'
import { useState } from 'react'
import useDataFetch from '.'

export default function useData(url, body = undefined, { setLoading, setError }={}) {
    const [data, setData] = useState(null)

    useDataFetch(url, body, { setData, setError, setLoading })

    return data
}
