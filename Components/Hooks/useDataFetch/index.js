import { POST } from "@upgradableweb/client"
import { useEffect } from "react"

export default function useDataFetch(url, body, { setLoading, setData, onResponse, onError }, deps = []) {

    function onRes(res) {
        if (res.data && setData) {
            setData(res.data)
        }
        onResponse && onResponse(res)
    }

    function onErr(err) {
        if (!onError) {
            alert(err.message)
        } else {
            onError(err)
        }

    }

    useEffect(() => {
        if (!url) return
        POST(url, body, { setLoading, onResponse: onRes, onError: onErr })
    }, [url, ...deps])

}
