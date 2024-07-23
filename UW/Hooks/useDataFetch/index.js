import { POST } from "@upgradableweb/client"
import { useEffect } from "react"

export default function useDataFetch(url, body, { setLoading, setData, onResponse, setError, onError }, deps = []) {

    function onRes(res) {
        if (typeof res.data !== 'undefined' && setData) {
            setData(res.data)
        }
        onResponse && onResponse(res)
    }

    useEffect(() => {
        if (!url) return
        POST(url, body, { setLoading, onResponse: onRes, onError, setError })
    }, [url, ...deps])

}
