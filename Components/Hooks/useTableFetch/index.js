import { POST } from "@upgradableweb/client"
import { useEffect } from "react"

export default function useTableFetch(url, body, { setLoading, setData, onResponse, setTotal }, deps = []) {

    useEffect(() => {
        if (!url) return
        setLoading && setLoading(true)
        POST(url, body)
            .then(res => {
                if (Array.isArray(res.data)) {
                    if (body.skip) {
                        setData && setData(prev => ([...prev, ...res.data]))
                    } else {
                        setData && setData(res.data)
                    }
                }
                if (res.total_count) {
                    setTotal && setTotal(res.total_count)
                }
                onResponse && onResponse(res)
            })
            .catch(err => {
                alert(err.message)
            })
            .finally(() => setLoading && setLoading(false))

    }, deps)

}
