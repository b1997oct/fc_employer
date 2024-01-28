import { Add, Check } from "@/Components/Icons"
import Status from "./Status"

let links = [
    'Applied',
    'Viewed',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected',
    'Inactive',
    'Closed',
    'Withdrawn'
]

links = links.map(d => {
    return { label: d, value: d.toLowerCase() }
})

const chipCn = 'chip df hover relative border aic gap-1 active '

export default function AllStatuses({ status, name = 'status', setChange }) {

    let statusValue = status
    if (typeof status === 'number') {
        statusValue = [Status(status)]
    }

    function handleChange(val) {
        let f
        if (typeof status === 'number') {
            f = Status(val)
        } else if (status.includes(val)) {
            f = status.filter(d => d !== val)
        } else {
            f = [...status, val]
        }
        setChange(prev => ({
            ...prev,
            [name]: f
        }))
    }

    return (
        <div className="df mt gap fww">
            {links.slice(2, 9).map((d, i) => {
                const { value, label } = d
                const ac = statusValue.includes(value)
                const cn = chipCn + (ac ? 'filled-chip-p' : 'chip-hover')
                return <button key={i} onClick={() => handleChange(value)} className={cn} >{ac ? <Check size={18} /> : <Add size={18} />} {label}</button>
            })}
        </div>
    )
}
