import useDataFetch from "@/Components/Hooks/useDataFetch"
import { useTheme } from "@/Layout/Theme"
import { useState } from "react"

export default function DashboardCard({ title, url, body }) {
    const [data, setData] = useState(0)
    const [loading, setLoading] = useState(false)
    const { width } = useTheme()

    useDataFetch(url, body, { setData, setLoading })

    return (
        <div style={{ padding: 32 }} className={`bg m rounded-sm bold ${width ? '' : 'w-full'}`}>
            <h1 className="mb tac cp">{title}</h1>
            <h1 className="tac">{data}</h1>
        </div>
    )
}
