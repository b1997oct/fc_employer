
export default function DashboardCard({ title, value }) {
    return (
        <div style={{ padding: 32 }} className="bg m rounded-sm bold">
            <h1 className="mb tac cp">{title}</h1>
            <h1 className="tac">{value}</h1>
        </div>
    )
}
