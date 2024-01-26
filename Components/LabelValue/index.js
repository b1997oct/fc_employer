export default function LabelValue({ label, value }) {

    if (value) {
        return (
            <div className="mt-2">
                <b>{label}</b>
                <div>{value}</div>
            </div>
        )
    }

}