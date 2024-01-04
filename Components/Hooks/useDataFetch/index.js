import { POST } from "@upgradableweb/client"
import { useEffect } from "react"

export default function useDataFetch(url, body, { setLoading, setData, onResponse, onStatus }, deps = []) {

    useEffect(() => {
        if (!url) return
        setLoading && setLoading(true)
        POST(url, body)
            .then(res => {
                setData && setData(res.data)
                onResponse && onResponse(res)
                onStatus && onStatus(res.status)
            })
            .catch(err => {
                onStatus && onStatus(err.status)
                alert(err.message)
            })
            .finally(() => setLoading && setLoading(false))

    }, [url, ...deps])

}
