import ServerFunction from "@/server"
import { useEffect, useState } from "react"

let app = ['', 'Applied', 'Viewed', 'Shortlisted', 'Interview', 'Selected', 'Rejected']
export function AppStatus(val) {
    val = typeof val == 'number' ? app[val] : app.indexOf(val)
    return val
}

let all = {}
export default function useStatuses(type) {
    let [data, setData] = useState([]),
        onResponse = res => {
            all[type] = res
            setData(res)
        }, statusSearch = ServerFunction('statusSearch', { onResponse })

    useEffect(() => {
        if (all[type]) {
            setData(all[type])
        } else if (!data.length) {
            statusSearch(type)
        }
    }, [type])

    return data
}