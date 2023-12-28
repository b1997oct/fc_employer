export default function LabelValue({ label, value }) {
    return (
        <div>
            <h3 className="bold mt">{label}</h3>
            <div>{value}</div>
        </div>
    )
}