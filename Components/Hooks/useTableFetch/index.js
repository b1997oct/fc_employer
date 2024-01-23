import { POST } from "@upgradableweb/client"
import { useEffect } from "react"

export default function useTableFetch(url, body, { setLoading, setData, onResponse, setTotal, onError }, deps = []) {

    function onRes(res) {
        if (Array.isArray(res.data) && setData) {
            if (body.skip) {
                setData(prev => ([...prev, ...res.data]))
            } else {
                setData(res.data)
            }
        }

        if (typeof res.total_count !== 'undefined' && setTotal) {
            setTotal(res.total_count)
        }
        onResponse && onResponse(res)
    }

    useEffect(() => {
        if (!url) return
        POST(url, body, { onResponse: onRes, setLoading, onError })
    }, [url, ...deps])

}
