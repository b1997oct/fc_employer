export default function LabelValue({ label, value }) {

    const f = Array.isArray(value) ? value.length : value
    if (f) {
        return (
            <div className="mt-2">
                <b>{label}</b>
                <div>{value}</div>
            </div>
        )
    }

}