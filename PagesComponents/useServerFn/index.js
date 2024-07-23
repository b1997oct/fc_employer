import ServerFunction from '@/server'
import { useEffect, useState } from 'react'

export default function useServerFn(serverFn) {
    const [data, setData] = useState({}),
        [loading, setLoading] = useState()

    useEffect(() => {
        ServerFunction(serverFn, { onResponse: setData, setLoading })()
    }, [])

    return { data, loading }
}
