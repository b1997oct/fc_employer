import { POST } from "@upgradableweb/client"
import { useEffect } from "react"

export default function useTableFetch({ url, setLoading, setData, onResponse, setTotal }, deps = []) {

    useEffect(() => {
        setLoading(true)
        POST(url, ...deps)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setData && setData(res.data)
                }
                if (res.totol_count) {
                    setTotal && setTotal(res.totol_count)
                }
                onResponse && onResponse(res)
            })
            .catch(err => {
                alert(err.message)
            })
            .finally(() => setLoading(false))

    }, deps)

}
