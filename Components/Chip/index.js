import { Cancel } from "../Icons";

export default function Chip({ className, children, onDelete, value }) {
    return (
        <div className={`px-2 py-1 gap-2 df skt rounded-md aic ${className}`}>
            {children} {onDelete && <button onClick={() => onDelete(value)} style={{ padding: 0 }} className="icon-btn cp"><Cancel /></button>}
        </div>
    )
}

export function MultiChips({ data, onDelete }) {
    return (
        <div className='df aic gap-2 fww mt-2'>
            {Array.isArray(data) && data.map((d, i) => (
                <Chip key={i} value={i} onDelete={onDelete}>
                    {d}
                </Chip>
            ))}
        </div>
    )
}