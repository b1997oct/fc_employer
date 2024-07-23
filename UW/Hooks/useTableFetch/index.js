'use client'

import ObjVal from "@/lib/Obj"
import { POST } from "@upgradableweb/client"
import { useEffect } from "react"

export default function useTableFetch(url, body, { setLoading, onResponse }, deps = []) {

    function onRes(res) {
        const { data } = res, { skip } = ObjVal(body)
        if (skip) {
            onResponse(prev => ({
                ...prev,
                data: [...prev.data, ...data]
            }))
        } else {
            onResponse(res)
        }
    }


    useEffect(() => {
        if (!url) return
        POST(url, body, { onResponse: onRes, setLoading, setError: onResponse })
    }, [url, ...deps])


}
