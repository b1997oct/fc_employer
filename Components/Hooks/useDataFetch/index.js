import { POST } from "@upgradableweb/client"
import { useEffect } from "react"

export default function useDataFetch(url, body, { setLoading, setData, onResponse }, deps = []) {

    useEffect(() => {
        if (!url) return
        setLoading && setLoading(true)
        POST(url, body)
            .then(res => {
                setData && setData(res.data)
                onResponse && onResponse(res)
            })
            .catch(err => {
                alert(err.message)
            })
            .finally(() => setLoading && setLoading(false))

    }, [url, ...deps])

}
