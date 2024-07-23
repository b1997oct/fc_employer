import ServerFunction from '@/server'
import React, { useEffect, useState } from 'react'


export default function useEvents() {

    let [data, setData] = useState(),
        onResponse = res => setData(res.data),
        eventSearch = ServerFunction('eventSearch', { onResponse })

    useEffect(() => {
        !data && eventSearch({})
    }, [])
    return data || []
}
