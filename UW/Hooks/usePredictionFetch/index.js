import { POST } from "@upgradableweb/client"
import { useEffect, useRef } from "react"

export default function usePredictionFetch(url, body, { setLoading, timeOut = 500, setData, onResponse, setTotal, onError }, deps = []) {

    const tm = useRef(null)

    function onRes(res) {
        if (Array.isArray(res.data) && setData) {
            if (body.skip) {
                setData(prev => ([...prev, ...res.data]))
            } else {
                setData(res.data)
            }
        }

        if (res.total_count && setTotal) {
            setTotal(res.total_count)
        }
        onResponse && onResponse(res)
    }

    useEffect(() => {
        if (!url) return

        if (body.skip) {
            POST(url, body, { onResponse: onRes, setLoading, onError })
        } else {
            clearTimeout(tm.current)
            tm.current = setTimeout(() => {
                POST(url, body, { onResponse: onRes, setLoading, onError })
            }, timeOut)
        }

        return () => clearTimeout(tm.current)

    }, [url, ...deps])

}
