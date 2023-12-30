import useTableFetch from "@/Components/Hooks/useTableFetch"
import { useState } from "react"

export default function DashboardCard({ title, url, value }) {
    const [data, setData] = useState(0)
    const [loading, setLoading] = useState(false)
    useTableFetch({ url, setData, setLoading })
    return (
        <div style={{ padding: 32 }} className="bg m rounded-sm bold">
            <h1 className="mb tac cp">{title}</h1>
            <h1 className="tac">{url ? data : value}</h1>
        </div>
    )
}
